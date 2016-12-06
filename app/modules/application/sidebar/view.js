var Marionette = require('backbone.marionette');
var template = require('./template.hbs');

module.exports = Marionette.ItemView.extend({
	template: template,
	className: 'sidebar--component',

	ui: {
		navigate: '.js-navigate',
	},

	events: {
		'click @ui.navigate': 'doNavigate',
	},

	doNavigate: function(event) {
		event.preventDefault();
		App.vent.trigger('navigate:{0}'.format(event.currentTarget.getAttribute('rel').replace(/\//g, ':')));
	},

	serializeData: function() {
		return this.model;
	},
});
