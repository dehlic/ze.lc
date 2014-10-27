'use strict';

var Backbone = require('backbone');
var $ = require('jbone');
var _ = require('lodash');
var template = require('../templates/Index.hbs');
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
    'click button': 'getShortUrl',
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
    this.$el.find('#short-url').html(this.model.get('short_url'));
    this.el.classList.add('short-url-visible');
  },

  displayError: function(model, request) {
    var $errorViewEl = new ErrorView({error: request.response}).render().$el;
    $('body').append($errorViewEl);
  },

  toggleAdvanced: function() {
    this.el.classList.toggle('advanced');
    this.$el.find('#custom-url').val('');
  },

  render: function () {
    this.$el.html(template());
  },

  bindEvents: function () {
    this.$el.on('change', 'input', _.bind(this.updateLocalModel, this));
  }

});
