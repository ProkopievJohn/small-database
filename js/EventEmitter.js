function EventEmitter() {
	this.events = {};
}

EventEmitter.prototype.on = function(event, listener) {
	if (typeof this.events[event] !== 'object') {
		this.events[event] = [];
	}
	this.events[event].push(listener);
};

EventEmitter.prototype.emit = function (event) {
	if (typeof this.events[event] !== 'object') return;
	var args = [].slice.call(arguments, 1),
		listeners = this.events[event].slice(),
		length = listeners.length;
	for(var i = 0; i < length; i++) {
		listeners[i].apply(this, args)
	}
};

EventEmitter.prototype.removeListener = function (event, listener) {
	if (typeof this.events[event] !== 'object') return;
	var id = this.events[event].indexOf(listener);
	if (id !== -1) {
		this.events[event].splice(id, 1);
	}
};
