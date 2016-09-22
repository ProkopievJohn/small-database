function App() {
	this.data = {
		id: 'myid',
		name: 'name',
		fun: function(){
			console.log('i fun');
		}
	};
	this.database = new Database();
	// this.
	this.init();
}

App.prototype = Object.create(EventEmitter.prototype);

App.prototype.init = function () {
	this.database.add(this.data);
	console.log(this.get());
	// this.on('data-myid', this.do.bind(this));
};

App.prototype.do = function () {
	console.log(arguments);
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
});