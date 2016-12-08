var View = require('./view');

module.exports = {
	getView: function () {
		this.view = new View();

		return this.view;
	},
};
