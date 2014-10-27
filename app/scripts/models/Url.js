'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var $ = require('jbone');
var reqwest = require('reqwest').compat;
$.ajax = reqwest;
var Utils = require('../utils/Utils');
var utils = new Utils();

module.exports = Backbone.Model.extend({
  defaults: {
  },
  url: function () {
    /*return '/rest/product/'+this.id;*/
    return utils.apiUrl + 'new';
  },
  sync: function(method, model, options){
    var methodMap = {
	    'create': 'POST',
	    'update': 'PUT',
	    'delete': 'DELETE',
	    'read': 'GET'
    };

    var type = methodMap[method];

    // Default options, unless specified.
    options = options || (options = {});

    options.crossOrigin = true;

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};
    if (params.type !== 'GET' && !Backbone.emulateJSON) {
      params.processData = true;
    }
    if (!options.url) {
      params.url = this.url();
    }
    params.data = model.attributes;

    if (params.data.custom_url) {
      params.data.short_url = params.data.custom_url;
    }

    return $.ajax(_.extend(params, options));
  },

  parse: function(resp) {
    if(resp.short_url) {
      resp.short_url = utils.baseUrl + resp.short_url;
    }
    return resp;
  },

  validate: function(attributes) {
    if (!attributes.url) {
      return 'Url can\'t be blank';
    }

    // Todo: Add URL validation

    return false;
  }

});
