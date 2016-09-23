function Cities(el) {
	if (!el) return;
	this.el = el;
	this.elToAdd = this.el.querySelector('#cities-list');
	this.elForAdd = this.el.querySelector('#cities-input');
	// this.helperForFind = [];
	this.init();
}

Cities.prototype = {
	init: function () {
		this.el.addEventListener('click', this.delegationClick.bind(this));
		this.el.addEventListener('keyup', this.delegationKeyup.bind(this));
	},

	delegationClick: function (e) {
		var target = e.target;
	},

	delegationKeyup: function (e) {
		var target = e.target;

		// this.elForAdd.value
		this.findInList(this.elForAdd.value);
	},

	addCity: function (text) {
		if (typeof text !== 'string') return;
		// console.log(text);
		this.elToAdd.insertAdjacentHTML('beforeend', '<li>' + text + '</li>');
	},

	clearAllList: function () {
		var els = this.elToAdd.children;
		for (var i = 0; i < els.length; i++) {
			els[i].parentNode.removeChild(els[i]);
		}
	},

	findInList: function (text) {
		var els = this.elToAdd.children;
		for (var i = 0; i < Things.length; i++) {
			Things[i]
		}
		console.log(text);
	}
}
