'use strict';

var Backbone = require('backbone');
var $ = require('jbone');
var _ = require('lodash');
var template = require('../templates/Error.hbs');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  className: 'error',

  events: {},

  initialize: function (options) {
    this.options = options || {};
    this.error = JSON.parse(this.options.error);
  },

  render: function () {
    this.$el.html(template({
      message: this.error.message
    }));
    setTimeout(_.bind(this.remove, this), 5000);

    return this;
  }
});
