'use strict';

var Backbone = require('backbone');
module.exports = Backbone.Model.extend({
  defaults: {
  },
  apiUrl: 'http://api.staging.ze.lc/v1/',
  baseUrl: 'http://staging.ze.lc/'
});
