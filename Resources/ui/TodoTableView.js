function TodoTableView() {
	//load dependencies
	var datastore = require('services/datastore');
	
	//create object instance
	var self = Ti.UI.createTableView({
		data:[{title:'Loading Data...'}]
	});
	
	//state variable
	var todos = [];
	
	//add behavior
	function loadData() {
		var tableData = [];
		todos = datastore.getList();
		
		for (var i = 0, l = todos.length; i<l; i++) {
			var todo = todos[i];
			tableData.push({
				title:todo.text,
				hasCheck:todo.done,
				todoObject:todo
			});
		}
		self.setData(tableData);
	}
	
	//toggle done state of todo item on click
	self.addEventListener('click', function(e) {
		var todo = todos[e.index];
		todo.done = !todo.done;
		datastore.saveTodo(todo);
		//update row UI
		e.row.hasCheck = todo.done;
	});
	
	//reload data when we're told that it has changed
	self.addEventListener('todosUpdated', loadData);
	
	//initialize and return instance from constructor
	loadData();
	return self;
}

module.exports = TodoTableView;