function Todo(text, done, guid) {
	this.text = text;
	this.done = done||false;
	this.guid = guid;
}
module.exports = Todo;
