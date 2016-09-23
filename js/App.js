function App() {
	this.data = {
		id: 'id2',
		name: 'name2',
	};
	this.database = new Database();
	this.test = new Test(document.querySelector('.all'));
	this.tests = new Tests(document.querySelector('.get'));
	this.init();
}

App.prototype.init = function () {
	this.database.on('data', this.do.bind(this));
	this.test.on('test-add', this.database.add.bind(this.database));
	this.test.on('test-del', this.database.delete.bind(this.database));
	this.tests.on('delel', this.database.delete.bind(this.database));
	this.database.add(this.data);
	this.database.add({name: 'name1', id: 'id1'});
};
/***************************************/
App.prototype.do = function (data) {
	if (typeof data !== 'object') return;
	data.deladd ? this.tests.addEl(data.id, data.name) : this.tests.delEl(data.id);
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
	database = new Database();
});
