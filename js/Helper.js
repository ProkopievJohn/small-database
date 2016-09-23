function Helper() {}


Helper.prototype.XMLLoad = function (method, url, callback) {
	'use strict';
	var xml = new XMLHttpRequest();
	xml.addEventListener('readystatechange', function () {
		if (xml.readyState == 4 && xml.status == 200) {
			callback(xml.responseText);
		}
	});
	xml.open(method, url, true);
	xml.send();
};

Helper.prototype.helperSearchInArray = function (obj, key, callback, self) {
	for (var i in obj) {
		if (i == key) {
			callback(obj[i], self);
		} else if (typeof obj[i] == "object" && Object.keys(obj[i]).length > 0) {
			self.helperSearchInArray(obj[i], key, callback, self);
		}
	}
};