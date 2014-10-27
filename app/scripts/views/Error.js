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
    // Different error object between local and remote validation.
    if (typeof(this.options.error) === 'string') {
      this.errorMessage = this.options.error;
    } else {
      this.errorMessage = JSON.parse(this.options.error.response).message;
    }
  },

  render: function () {
    this.$el.html(template({
      message: this.errorMessage
    }));
    setTimeout(_.bind(this.remove, this), 5000);

    return this;
  }
});
