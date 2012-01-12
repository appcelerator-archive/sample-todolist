//load dependencies
var Todo = require('model/Todo');

//bootstrap datastore
var saved = Ti.App.Properties.getString('db');
var datastore = (saved) ? JSON.parse(saved):[];

//implement service interface
exports.getList = function() {
	return datastore.slice(0);
};

//save a Todo object to our data store
exports.saveTodo = function(todo) {
	if (todo.guid) {
		for (var i = 0, l = datastore.length; i<l; i++) {
			var current = datastore[i];
			if (current.guid === todo.guid) {
				datastore[i] = todo;
			}
		}
	}
	else {
		todo.guid = new Date().getTime();
		datastore.push(todo);
	}
	Ti.App.Properties.setString('db',JSON.stringify(datastore));
};