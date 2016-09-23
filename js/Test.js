function Test(el) {
	this.el = el;
	this.events = new EventEmitter();
	this.init();
}

Test.prototype = {
	init: function () {
		this.el.addEventListener('click', this.delegation.bind(this));
		// this.on('data', function(){console.log(arguments);})
	},

	delegation: function (e) {
		var target = e.target;
		if (target.classList.contains('add')) {
			this.emit('test-add', {id: 'test', funct: function () {console.log('ok')}, notest:'notest'})
		}
		if (target.classList.contains('del')) {
			this.emit('test-del', {id: 'test', funct: function () {console.log('ok')}, notest:'notest'})
		}
	},

	emit: function (event, parameters) {
		this.events.emit(event, parameters);
	},

	on: function (event, listener) {
		this.events.on(event, listener);
	}
}
