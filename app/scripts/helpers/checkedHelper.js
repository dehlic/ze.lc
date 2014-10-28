'use strict';
var Handlebars = require('hbsfy/runtime');
Handlebars.registerHelper('checkedHelper', function(foo, bar) {
  return foo === bar ? ' checked' : '';
});
