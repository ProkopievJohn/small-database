function Countries(el) {
	if (!el) return;
	this.el = el;
	this.elToAdd = this.el.querySelector('#countries-list');
	this.elForAdd = this.el.querySelector('#country-input');
	this.events = new EventEmitter ();
	this.init();
}

Countries.prototype = {
	init: function () {
		this.el.addEventListener('click', this.delegationClick.bind(this));
		this.el.addEventListener('keyup', this.delegationKeyup.bind(this));
	},

	delegationClick: function (e) {
		var target = e.target;

		if (target.tagName === 'LI') {
			this.enterCountry(target);
			this.emit('country-enter', target);
		}
	},

	delegationKeyup: function (e) {
		var target = e.target;

		this.findInList(this.elForAdd.value);
		if (e.keyCode === 13) {
			var el = this.elToAdd.querySelector('.show-list');
			this.enterCountry(el);
		}
	},

	addCountry: function (text) {
		if (typeof text !== 'string' || text === '') return;
		this.elToAdd.insertAdjacentHTML('beforeend', '<li>' + text + '</li>');
	},

	clearAllList: function () {
		while (this.elToAdd.firstChild) {
			this.elToAdd.removeChild(this.elToAdd.firstChild);
		}
	},

	hideAll: function () {
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			els[i].classList.remove('show-list', 'selected');
			els[i].classList.add('hide');
		}
	},

	unSelected: function () {
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			els[i].classList.remove('selected');
		}
	},

	findInList: function (text) {
		var els = this.elToAdd.children;
		this.hideAll();
		for (var i = 0; i < els.length; i++) {
			if (els[i].innerHTML.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
				els[i].classList.remove('hide');
				els[i].classList.add('show-list');
			}
		}
		var allShow = this.elToAdd.querySelectorAll('.show-list');
		this.emit('choose-countries', allShow);
	},

	chooseInList: function (arr) {
		this.hideAll();
		function helper(arr) {
			return function (el, i, array) {
				for (var i = 0; i < arr.length; i++) {
					if (el === arr[i].innerHTML) {
						arr[i].classList.remove('hide');
						arr[i].classList.add('show-list');
					}
				}
			}
		}
		var els = this.elToAdd.children;
		arr.forEach(helper(els));
	},

	enterCountry: function (el) {
		this.unSelected();
		el.classList.add('selected');
		this.emit('country-enter', el);
	},

	getByHtml: function (text) {
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			if (els[i].innerHTML.toLowerCase() === text.toLowerCase()) {
				return els[i];
			}
		}
	},

	emit: function (event, parameters) {
		this.events.emit(event, parameters);
	},

	on: function (event, listener) {
		this.events.on(event, listener);
	}
}
