var Marionette = require('backbone.marionette');
var View = require('./view.js');

var Controller = {
	name: 'exampleModule',

	init: function() {
		// initialize module
	},

	destroy: function() {
		// destroy module
		// can destroy views, reset values to default, clear stores
	}
};

// marionette object have some methods predefined
// also extends Backbone.Events object
var MarionetteController = Marionette.Object({});

module.exports = Controller;
