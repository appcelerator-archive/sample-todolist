function ApplicationWindow() {
	//load dependencies
	var TodoFormView = require('ui/TodoFormView'),
		TodoTableView = require('ui/TodoTableView'),
		network = require('services/network'),
		datastore = require('services/datastore');
	
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		exitOnClose:true
	});
	
	//construct UI
	var todoForm = new TodoFormView();
	todoForm.top = 0;
	self.add(todoForm);
	
	var todoList = new TodoTableView();
	todoList.top = 60;
	self.add(todoList);
	
	//add behavior
	todoForm.addEventListener('todoSaved', function() {
		todoList.fireEvent('todosUpdated');
	});
	
	//bootstrap the datastore, if necessary
	if (!Ti.App.Properties.hasProperty('seeded')) {
		network.getList(function(todos) {
			for (var i = 0, l = todos.length; i<l; i++) {
				datastore.saveTodo(todos[i]);
			}
			todoList.fireEvent('todosUpdated');
			Ti.App.Properties.setBool('seeded', true);
		});
	}
	
	//return instance from constructor
	return self;
}

module.exports = ApplicationWindow;