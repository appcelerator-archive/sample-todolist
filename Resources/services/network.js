//load dependencies
var Todo = require('model/Todo');

//implement service interface
exports.getList = function(callback) {
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function() {
		var data = JSON.parse(this.responseText),
			todos = [];
			
		for (var i = 0, l = data.length; i<l; i++) {
			var todo = new Todo(data[i].todo);
			todos.push(todo);
		}
		
		//call callback function with an array of Todos
		callback.call(this,todos);
	};
	xhr.open('GET','http://titaniumtodos.appspot.com/todos');
	xhr.send();
};
