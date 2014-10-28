'use strict';

var Backbone = require('backbone');
var $ = require('jbone');
var _ = require('lodash');
var ZeroClipboard = require('zeroclipboard');
var template = require('../templates/Index.hbs');
var shortUrlTemplate = require('../templates/ShortUrl.hbs');
var reqwest = require('reqwest').compat;
$.ajax = reqwest;

Backbone.$ = $;

var Url = require('../models/Url');

var OfflineUrlsView = require('../views/OfflineUrls');
var ErrorView = require('../views/Error');


module.exports = Backbone.View.extend({

  tagName:'div',

  className: 'form-view',

  events: {
    'click .icon-settings': 'toggleAdvanced'
  },

  initialize: function (options) {
    this.options = options || {};
    this.OfflineUrlsView = new OfflineUrlsView();
    this.initializeModel();
    this.bindEvents();
  },

  initializeModel: function() {
    this.model = new Url({
      url: this.$el.find('#long-url').val(),
      custom_url: this.$el.find('#custom-url').val()
    });
    this.model.on('change:short_url', _.bind(this.saveCallback, this));
    this.model.on('invalid', _.bind(this.displayError, this));
  },

  getShortUrl: function () {
    this.model.save({
        url: this.model.get('url'),
        custom_url: this.model.get('custom_url')
      },
      {
        error: this.displayError
      }
    );
  },

  updateLocalModel: function () {
    this.model.set('url', this.$el.find('#long-url').val());
    this.model.set('custom_url', this.$el.find('#custom-url').val());
  },

  saveCallback: function () {
    this.displayShortUrl();

    this.OfflineUrlsView.addUrl(this.model.attributes);

    this.initializeModel();
  },

  displayShortUrl: function () {
    this.$el.find('#short-url').html(
      shortUrlTemplate({
        shortUrl: this.model.get('short_url')
      })
    );
    this.el.classList.add('short-url-visible');
    this.Clipboard = new ZeroClipboard(this.$el.find('.copy'));
    this.Clipboard.on('aftercopy', _.bind(this.afterCopy, this));
  },

  displayError: function (model, request) {
    var $errorViewEl = new ErrorView({error: request}).render().$el;
    $('body').append($errorViewEl);
  },

  afterCopy: function (e) {
    var $target = $(e.target);
    $target.html('copied!');
    setTimeout(function() {
      $target.html('copy!');
    }, 3000);
  },

  toggleAdvanced: function () {
    this.el.classList.toggle('advanced');
    this.$el.find('#custom-url').val('');
  },

  submitForm: function (e) {
    e.preventDefault();
    this.getShortUrl();
  },



  render: function () {
    this.$el.html(template());
  },

  bindEvents: function () {
    this.$el.on('change', 'input', _.bind(this.updateLocalModel, this));
    this.$el.on('submit', 'form', _.bind(this.submitForm, this));
  }

});
