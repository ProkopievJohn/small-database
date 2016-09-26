function App() {
	this.database = new Database();
	this.url = 'https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json';
	this.countries = new Countries(document.querySelector('#countries'));
	this.cities = new Cities(document.querySelector('#cities'));
	this.init();
}

App.prototype = Object.create(Helper.prototype);

App.prototype.init = function () {
	window.d = this.database;
	this.database.on('data-add', this.dataAddDo.bind(this));
	this.countries.on('choose-countries', this.chooseCountries.bind(this));
	this.countries.on('country-enter', this.countryEnter.bind(this));
	this.cities.on('city-enter', this.citiesEnter.bind(this));
	this.XMLLoad('GET', this.url, this.addDataToBase.bind(this));
};

App.prototype.addDataToBase = function (data) {
	var data = JSON.parse(data);
	for (var i in data) {
		if (i !== '') {
			if (i === 'Norway' || i === 'Denmark' || i === 'Bermuda') {
				this.database.dataAdd({id: i, cities: data[i]})
			}
		}
	}
};

App.prototype.dataAddDo = function (data) {
	this.countries.addCountry(data.id);
	var merged = this.database.items[this.database.items.length - 1].cities;
	if (!merged) return;
	for (var i = 0; i < merged.length; i++) {
		this.cities.addCity(merged[i], data.id);
	}
};

App.prototype.chooseCountries = function (data) {
	var response = [];
	for (var i = 0; i < data.length; i++) {
		response.push(data[i].innerHTML)
	}
	this.cities.chooseInList(response);
};

App.prototype.countryEnter = function (data) {
	this.cities.startChooseCities(data.innerHTML);
};

App.prototype.citiesEnter = function (data) {
	this.countries.enterCountry(this.countries.getByHtml(data.getAttribute('country-name')));
	alert('Country: ' + data.getAttribute('country-name') + '; City: ' + data.innerHTML)
};

window.addEventListener('DOMContentLoaded', function(){
	new App();
});
