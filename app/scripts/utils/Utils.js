'use strict';

var Backbone = require('backbone');
module.exports = Backbone.Model.extend({
  defaults: {
  },
  apiUrl: 'http://api.ze.lc/v1/',
  baseUrl: 'http://ze.lc/'
});
