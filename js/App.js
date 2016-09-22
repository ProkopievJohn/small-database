function App() {
	this.data = {
		id: 'myid',
		name: 'name',
		fun: function(){
			console.log('i fun');
		}
	};
	this.database = new Database();
	this.events = new EventEmitter();
	// this.t = new Test(document.querySelector('.all'));
	this.init();
}

App.prototype.init = function () {
	new Test(document.querySelector('.all'));
	this.database.add(this.data);
	this.database.add({name: 'name', id: 'nameid'});
	this.on('data-myid', this.do.bind(this));
	this.on('test', this.dodo.bind(this));
};

App.prototype.do = function () {
	console.log(arguments);
};
App.prototype.dodo = function () {
	document.querySelector('get').innerHTML = 'ola';
};

App.prototype.on = function (event, listener) {
	this.events.on(event, listener);
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
});