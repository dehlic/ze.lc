'use strict';

var Backbone = require('backbone');
var $ = require('jbone');
Backbone.$ = $;

var MainView = require('../views/Main');
var IndexView = require('../views/Index');

module.exports = Backbone.Router.extend({
  routes: {
    '': 'index'
  },

  initialize: function () {
    this.mainView = new MainView({router: this});
    this.mainView.render();
  },

  changeView: function (view, viewRoute) {

    if (this.currentView) {
      this.currentView.remove();
    }

    this.currentView = view;
    if (viewRoute !== this.currentViewRoute) {
      this.currentViewRoute = viewRoute;
    }

    view.render();
    this.mainView.$el.find('#main-content').append(view.$el);
  },

  // Actions
  index: function () {
    var view = new IndexView({
      mainView: this.mainView,
    });
    this.changeView(view, '#');
  }

});
