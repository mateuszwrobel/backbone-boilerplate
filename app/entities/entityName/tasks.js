var App = require('app');
var Backbone = require('backbone');

// concrete model
var Model = Backbone.Model.extend();

// concrete collection
var Collection = Backbone.Collection.extend({
	model: Model
});
// if entity is more complex and needs more definitions
// of models and collections you can create subfolders for them


// keep it simple, so if you want unit test it
var Api = {
	getSomething: function (options) {
		var data = {
			some: 'properties',
		};

		return $.post('path/to/sth', data);
	},

	getCollectionBackboneWay: function(options) {
		return Collection.fetch();
	},
};

// if you separate modules into chunks events may be better solution
App.reqres.setHandler('getSomething', function (options) {
	return Api.getSomething(options);
});

// if you want to create some caching system to let
// other parts of app to use data from this entity
var store = {};

// expose what needed
module.exports = {
	Model: Model,
	Collection: Collection,
	Api: Api,
	store: store
};
