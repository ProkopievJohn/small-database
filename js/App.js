function App() {
	this.database = new Database();
	this.url = 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json';
	this.database = new Database();
	this.countries = new Countries(document.querySelector('#countries'));
	this.cities = new Cities(document.querySelector('#cities'));
	this.init();
}

App.prototype = Object.create(Helper.prototype);

App.prototype.init = function () {
	this.database.on('data-add', this.dataAddDo.bind(this));
	this.XMLLoad('GET', this.url, this.addDataToBase.bind(this));
	
	// var data = {
	// 	id: 'usa',
	// 	citiessss: [
	// 		{1:'newyourk'},
	// 		{2:'sietle'},
	// 		{3:'losqangeles',cities: 'coties'}
	// 	]
	// }

	// this.database.dataAdd(data);
};

App.prototype.addDataToBase = function (data) {
	var data = JSON.parse(data);
	for (var i in data) {
		if (i !== '') {
			if (i === 'Norway' || i === 'Denmark') {
			this.database.dataAdd({id: i, cities: data[i]})
			}
		}
	}
};

App.prototype.dataAddDo = function (data) {
	this.countries.addCountry(data.id);
	var arrCities = this.database.dataFindProps('cities');
	this.cities.clearAllList();
	var merged = [].concat.apply([], arrCities);
	for (var i = 0; i < merged.length; i++) {
		this.cities.addCity(merged[i]);
	}
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
});

