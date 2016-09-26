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

Helper.prototype.getByAttribute = function (els, attrName) {
	var response = [];
	for (var i = 0; i < els.length; i++) {
		if (els[i].hasAttribute(attrName)) {
			response.push(els[i])
		}
	}
	return response;
};
