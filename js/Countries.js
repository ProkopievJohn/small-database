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

		console.log(e.keyCode);
		this.findInList(this.elForAdd.value);
	},

	addCountry: function (text) {
		if (typeof text !== 'string') return;
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
		for (var i = 0; i < els.length; i++) {
			els[i].classList.add('hide');
			if (els[i].innerHTML.toLowerCase().indexOf(text) !== -1) {
				els[i].classList.remove('hide');
				els[i].classList.add('show-list');
			}
		}
	}
}
