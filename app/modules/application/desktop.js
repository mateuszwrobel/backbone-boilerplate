var App = require('app');
var Marionette = require('backbone.marionette');
var HomeLayout = require('./layouts/home.hbs');
var ApplicationHeader = require('./header');
var ApplicationSidebar = require('./sidebar');
var userStore = require('stores/userStore');

var MainLayout = App.Vendor.LayoutView.extend({
	el: '#region--main',
	template: HomeLayout,
});

var HeaderRegion = App.Vendor.Region.extend({
	el: '#region--header'
});
var SidebarRegion = App.Vendor.Region.extend({
	el: '#region--sidebar'
});
var ContentRegion = App.Vendor.Region.extend({
	el: '#region--content'
});
var NotificationRegion = App.Vendor.ModalRegion.extend({
	el: '#region--notification'
});
var ModalRegion = App.Vendor.ModalRegion.extend({
	el: '#region--modal'
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

		App.request('getUserDetails')
			.done(function (userData) {
				if (userData.status === 204) {
					Controller.showRedirectDialog();
				} else {
					var user = userData.collection.at(0);
					userStore.set(user.toJSON());

					//extend system configuration
					_.each(confData.response.data.records[0], function (value, key) {
						App.Config.setValue(key, value);
					});

					$.when(
						Scope.Controller.showHeader(user),
						Scope.Controller.showSidebar(user)
					)
						.done(function () {
							App.vent.trigger('app:init:done');
						})
						.fail(function () {
							App.stop();
							App.vent.trigger('app:init:fail');
						});
				}
			})
			.fail(function () {
				App.vent.trigger('app:init:fail');
			});
	},
	// TODO change this dialog to new notification structure
	showRedirectDialog: function () {
	},

	showHeader: function (userModel) {
		var deferred = $.Deferred();

		App.headerRegion.on('show', function () {
			deferred.resolve();
		});

		App.headerRegion.show(ApplicationHeader.Controller.getView(userModel));

		return deferred.promise();

	},

	showSidebar: function (userModel) {
		var deferred = $.Deferred();

		ApplicationSidebar.init();

		App.sidebarRegion.on('show', function () {
			deferred.resolve();
		});

		App.sidebarRegion.show(ApplicationSidebar.Controller.getView(userModel));

		return deferred.promise();
	}
};

module.exports = Controller;
