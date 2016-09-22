function Test(el) {
	this.el = el;
	this.events = new EventEmitter();
	this.init();
}

Test.prototype = {
	init: function () {
		this.el.addEventListener('click', this.delegation.bind(this));
	},

	delegation: function (e) {
		var target = e.target;
		if (target.classList.contains('add')) {
			this.emit('test', {id: 'test', funct: function () {console.log('ok')}})
		}
	},

	emit: function (event, parameters) {
		this.events.emit(event, parameters);
	}
}
