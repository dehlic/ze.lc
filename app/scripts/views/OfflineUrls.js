'use strict';

var Backbone = require('backbone');
var $ = require('jbone');
var _ = require('lodash');
var template = require('../templates/OfflineUrls.hbs');
Backbone.$ = $;

var OfflineUrl = require('../models/OfflineUrl');
var Urls = require('../collections/Urls');

module.exports = Backbone.View.extend({

  el: '#offline-urls',

  className: '',

  events: {},

  initialize: function (options) {
    this.options = options || {};
    this.collection = new Urls();

    this.bindEvents();
    this.collection.fetch();
  },

  render: function () {
    this.$el.html(template({
      urls: this.collection.templatize()
    }));
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

  bindEvents: function () {
    this.collection.on('add', _.bind(this.render, this));
  }
});
