var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var _ = require('underscore');
var App = require('app');

// import screen controllers
var exampleScreen = require('screens/exampleScreen');

var RouteHits = 0;
var RouterInstance = {};

var Router = Marionette.AppRouter.extend({

	appRoutes: {
		'': 'showIndex',
		'index(/)': 'showIndex',
	},

	execute: function(callback, args, name) {
		// do some logic and redicrect here if needed
		callback.apply(this, args);
	}
});

var Controller = {

	showIndex: function() {
		var _arguments = arguments;
		// initialize screen
		// do addiotional work on this path (update sidebars/headers/whatever)
		App.startComponent(exampleScreen);
		exampleScreen.showIndex();
	},
};

App.navigate = function(route, options) {
	options = options || {};
	if (!options.replace) {
		RouteHits++;
	}
	Backbone.history.navigate(route, options);
};

App.canNavigate = function() {
	// implement some logic to block navigation functions (eg. data loss prevention on forms)
	var deferred = $.Deferred();
	deferred.resolve();

	return deferred.promise();
};

$(window).on('beforeunload', function() {
	// implement some logic to block navigation functions (eg. data loss prevention on forms)
});

App.navigateChecker = function(callback) {
	return function() {
		var _this = this;
		var _arguments = arguments;
		App.canNavigate()
			.done(function() {
				callback.apply(_this, _arguments);
			});
	};
};

// create navigation listeners, keep triggers simple
// dditional logic to call screen method write inside
App.vent.on('navigate:homepage', App.navigateChecker(function(params, options) {
	App.navigate('', options);
	Controller.showIndex();
}));

App.vent.on('navigate:back', App.navigateChecker(function() {
	if (RouteHits >= 1) {
		window.history.back();
	} else {
		App.vent.trigger('navigate:homepage');
	}
}));

App.on('start', function() {
	RouterInstance = new Router({
		controller: Controller
	});
});
