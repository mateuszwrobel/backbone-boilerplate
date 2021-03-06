var configJson = require('config/general');

var documentDateFormat = 'DD-MMM-YYYY';

module.exports = {

	isMAC: function () {
		return navigator.userAgent.match(/Mac/i);
	},

	isSafari: function () {
		return navigator.userAgent.match(/Safari/i) && navigator.vendor.match(/Apple Computer/i);
	},

	isChrome: function () {
		return window.chrome;
	},

	isIPhone: function () {
		return navigator.userAgent.match(/iPhone/i);
	},

	isIPad: function () {
		return (navigator.userAgent.match(/iPad/i));
	},

	isIPod: function () {
		return (navigator.userAgent.match(/iPod/i));
	},

	getValue: function (key) {
		return configJson[key];
	},

	setValue: function (key, value) {
		configJson[key] = value;
	},

};
