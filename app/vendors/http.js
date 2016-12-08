var $ = require('jquery');
var _ = require('underscore');

function errorHandlerHttp(promise) {
	promise.fail(function(response) {
		if(response.status === 0) return; //Ignore error code 0

		//report error in your way
	});
	return promise;
}

var _progressRequests = [];

function progressHttp (promise) {
	function _checkAllDone() {
		var pending = _progressRequests.filter(function (p) {
			return p.readyState === 3;
		});

		if (pending.length === 0) {
			_progressRequests = [];
		}
	}

	_progressRequests.push(promise);
	promise.always(function() {
		_checkAllDone();
	});
	return promise;
}

function jsonHttp(options) {
	options.contentType = 'application/json; charset=UTF-8';
	options.dataType = 'json';
	return options;
}

function jsonPayloadHttp(options) {
	options.processData = false;
	options.data = JSON.stringify(options.data);
	return options;
}

var ajax = $.ajax;
var progressAjax = _.compose(progressHttp, ajax);
var defaultAjax = _.compose(progressHttp, errorHandlerHttp, ajax);
var jsonAjax = _.compose(progressHttp, errorHandlerHttp, ajax, jsonHttp);
var jsonPayloadAjax = _.compose(progressHttp, errorHandlerHttp, ajax, jsonPayloadHttp, jsonHttp);

module.exports = {
	errorHandlerHttp: 	errorHandlerHttp,
	progressHttp: 	progressHttp,
	jsonHttp: 	jsonHttp,
	jsonPayloadHttp: 	jsonPayloadHttp,
	ajax: 	ajax,
	progressAjax: 	progressAjax,
	defaultAjax: 	defaultAjax,
	jsonAjax: 	jsonAjax,
	jsonPayloadAjax: 	jsonPayloadAjax,
};
