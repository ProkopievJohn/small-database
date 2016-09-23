function Countries(el) {
	if (!el) return;
	this.el = el;
	this.elToAdd = this.el.querySelector('#countries-list');
	this.elForAdd = this.el.querySelector('#country-input');
	this.init();
}

Countries.prototype = {
	init: function () {
		this.el.addEventListener('click', this.delegationClick.bind(this));
		this.el.addEventListener('keyup', this.delegationKeyup.bind(this));
	},

	delegationClick: function (e) {
		var target = e.target;
	},

	delegationKeyup: function (e) {
		var target = e.target;
	},

	addCountry: function (text) {
		if (typeof text !== 'string') return;
		this.elToAdd.insertAdjacentHTML('beforeend', '<li>' + text + '</li>');
	}
}
