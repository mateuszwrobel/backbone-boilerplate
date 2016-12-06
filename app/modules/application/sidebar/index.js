var App = require('app');
var View = require('./view');

	var Controller = {

		init: function() {
			console.log('sidebar start');
			this.view = new View();
		},

		getView: function(userModel) {

			var dataModel = {
				UiAppVersion: window.UiVersion,
			};

			this.view.model = dataModel;
			return this.view;
		},

	};


module.exports = App.module('Modules.Application.Sidebar');
