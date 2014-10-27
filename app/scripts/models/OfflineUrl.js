'use strict';

var Backbone = require('backbone');
var vagueTime = require('vague-time');

module.exports = Backbone.Model.extend({
  defaults: {
  },
  getPrettyTime: function () {
    var prettyTime = vagueTime.get({
      from: new Date().now,
      to: this.get('created_at')
    });
    return prettyTime;
  }
});
