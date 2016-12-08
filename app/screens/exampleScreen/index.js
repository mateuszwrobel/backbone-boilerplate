var Marionette = require('backbone.marionette');
var App = require('app');
var View = require('./view.js');

var Controller = {
	init: function() {
		// initialize module
	},

	showIndex: function() {
		// do some logic and
		App.getRegion('contentRegion').show(new View());
	},

	destroy: function() {
		// destroy module
		// can destroy views, reset values to default, clear stores
	}
};

// marionette object have some methods predefined
// also extends Backbone.Events object
var MarionetteController = Marionette.Object.extend({});

module.exports = Controller;
