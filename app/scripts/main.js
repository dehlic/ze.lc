var Backbone = require('backbone');
var AppRouter = require('./routes/app');

new AppRouter();

Backbone.history.start();
