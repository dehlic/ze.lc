'use strict';

var Backbone = require('backbone');
var $ = require('jbone');
var template = require('../templates/Main.hbs');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  el: '#body',

  className: '',

  events: {},

  initialize: function (options) {
    this.options = options || {};
  },

  render: function () {
    this.$el.html(template());
  }
});
