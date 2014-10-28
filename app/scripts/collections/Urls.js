'use strict';

var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');
var _ = require('lodash');

var OfflineUrl = require('../models/OfflineUrl');

module.exports = Backbone.Collection.extend({
  model: OfflineUrl,
  localStorage: new Backbone.LocalStorage('Urls'),
  templatize: function() {
    this.models = _.each(this.models, this.addCustomPropertyToModel);
    var json = this.toJSON();
    return json;
  },

  addCustomPropertyToModel: function(el) {
    el.attributes.prettyTime = el.getPrettyTime();
  },

  comparator: function(model) {
    return -(model.get('created_at'));
  },

  filterByDate: function (timestamp) {
    return this.filter(function(model) {
      return model.attributes.created_at > timestamp;
    });
  }
});
