function TodoFormView() {
	//load dependencies
	var datastore = require('services/datastore'),
		Todo = require('model/Todo');
	
	//create object instance
	var self = Ti.UI.createView({
		backgroundColor:'#cdcdcd',
		height:60
	});
	
	//construct UI
	var field = Ti.UI.createTextField({
		top:5,
		left:5,
		right:90,
		bottom:5,
		borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
	});
	self.add(field);
	
	var button = Ti.UI.createButton({
		right:5,
		top:5,
		bottom:5,
		width:80,
		title:'Save'
	});
	self.add(button);
	
	//add behavior
	button.addEventListener('click', function(e) {
		var todo = new Todo(field.value);
		datastore.saveTodo(todo);
		self.fireEvent('todoSaved');
		field.blur();
	});
	
	//return instance from constructor
	return self;
}

module.exports = TodoFormView;