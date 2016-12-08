var App = require('app');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var HomeLayout = require('./layouts/home.hbs');
var ApplicationHeader = require('./header');
var ApplicationSidebar = require('./sidebar');
var userStore = require('stores/userStore');

var entityName = require('entities/entityName');

var MainLayout = Marionette.LayoutView.extend({
	el: '#region--main',
	template: HomeLayout,
});

var HeaderRegion = Marionette.Region.extend({
	el: '#region--header',
});
var SidebarRegion = Marionette.Region.extend({
	el: '#region--sidebar',
});
var ContentRegion = Marionette.Region.extend({
	el: '#region--content',
});
var NotificationRegion = Marionette.Region.extend({
	el: '#region--notification',
});
var ModalRegion = Marionette.Region.extend({
	el: '#region--modal',
});

var Controller = {

	init: function () {
		var MainModel = new Backbone.Model({
			UiLoading: true,
			UiLoadingMsg: 'Loading user content...'
		});

		App.MainLayout = new MainLayout({
			model: MainModel
		});

		App.MainLayout.render();

		App.addRegions({
			headerRegion: HeaderRegion,
			sidebarRegion: SidebarRegion,
			contentRegion: ContentRegion,
			notificationRegion: NotificationRegion,
			modalRegion: ModalRegion,
		});

		entityName.api.getUserDetails()
			.done(function (userData) {
				userStore.set(userData);

				$.when(
					Controller.showHeader(userStore),
					Controller.showSidebar(userStore)
				)
					.done(function () {
						App.vent.trigger('app:init:done');
					})
					.fail(function () {
						App.stop();
						App.vent.trigger('app:init:fail');
					});
			})
			.fail(function () {
				App.vent.trigger('app:init:fail');
			});
	},

	showHeader: function (userModel) {
		var deferred = $.Deferred();

		App.headerRegion.on('show', function () {
			deferred.resolve();
		});

		App.headerRegion.show(ApplicationHeader.getView(userModel));

		return deferred.promise();

	},

	showSidebar: function (userModel) {
		var deferred = $.Deferred();

		ApplicationSidebar.init();

		App.sidebarRegion.on('show', function () {
			deferred.resolve();
		});

		App.sidebarRegion.show(ApplicationSidebar.getView(userModel));

		return deferred.promise();
	}
};

module.exports = Controller;
