function Tests(el) {
	this.el = el;
	this.events = new EventEmitter();
	this.init();
}

Tests.prototype = {
	init: function () {
		this.el.addEventListener('click', this.dalegation.bind(this));
	},

	dalegation: function (e) {
		var target = e.target;

		if (target.tagName === 'LI') {
			this.emit('delel', target.id);
		}
	},

	delEl: function (id) {
		var el = typeof id === 'string' ? this.el.querySelector('#' + id) : id;
		el.parentNode.removeChild(el);
	},

	addEl: function (id, text) {
		this.el.insertAdjacentHTML('beforeend', '<li id="' + id + '">' + text + '</li>');
	},

	emit: function (event, parameters) {
		this.events.emit(event, parameters);
	},

	on: function (event, listener) {
		this.events.on(event, listener);
	}
}