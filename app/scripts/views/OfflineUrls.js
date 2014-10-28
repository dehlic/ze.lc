'use strict';

var Backbone = require('backbone');
var $ = require('jbone');
var _ = require('lodash');
var ZeroClipboard = require('zeroclipboard');
var checkedHelper = require('../helpers/checkedHelper');
var template = require('../templates/OfflineUrls.hbs');
Backbone.$ = $;

var OfflineUrl = require('../models/OfflineUrl');
var Urls = require('../collections/Urls');

module.exports = Backbone.View.extend({

  el: '#offline-urls',

  className: '',

  events: {
    'click .url-filter .filter': 'filterUrls',
    'click .url-filter li.clear': 'reFetch'
  },

  initialize: function (options) {
    this.options = options || {};
    this.checkedFilter = '~';

    this.collection = new Urls();

    this.bindEvents();
    this.collection.fetch();
  },

  render: function () {
    this.$el.html(template({
      urls: this.collection.templatize(),
      checkedFilter: this.checkedFilter
    }));
    this.Clipboard = new ZeroClipboard(this.$el.find('.copy'));
    this.Clipboard.on('aftercopy', _.bind(this.afterCopy, this));
    return this;
  },

  addUrl: function (urlAttributes) {
    var linkExists = this.collection.where(urlAttributes);
    if (linkExists.length === 0) {
      var offlineUrl = new OfflineUrl(urlAttributes);
      offlineUrl.set('created_at', Date.now());
      offlineUrl.set('domain', offlineUrl.get('url').match(/:\/\/(.[^/]+)/)[1]);
      this.collection.add(offlineUrl);
      offlineUrl.save();
    }
  },

  afterCopy: function (e) {
    var $target = $(e.target).find('span');
    $target.html('copied!');
    setTimeout(function() {
      $target.html('copy!');
    }, 3000);
  },

  reFetch: function () {
    this.collection.fetch();
  },

  filterUrls: function () {
    var offsetTime = $('.url-filter input:checked').attr('data-offset-time');
    this.checkedFilter = offsetTime;
    var today = new Date();
    var hourago = new Date(today.getTime() - (parseInt(offsetTime)*60*60)).getTime();
    this.collection.fetch({reset: false});
    this.collection.reset(this.collection.filterByDate(hourago));
  },

  bindEvents: function () {
    this.collection.on('add reset', _.bind(this.render, this));
  }
});
