var Marionette = require('backbone.marionette');

var template = require('./template.hbs');

// never ever write business logic here
// if you need some property to display button
// create property in controller and pass it to view with model

module.exports = Marionette.ItemView.extend({
	template: template,
});
