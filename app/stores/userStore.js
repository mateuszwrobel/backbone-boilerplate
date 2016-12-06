var Backbone = require('backbone');

var UserStoreModel = Backbone.Model.extend();
var model = new UserStoreModel();

// example of store to keep logged in user data
// accessible through whole application
module.exports = model;
