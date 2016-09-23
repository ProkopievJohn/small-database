if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function(predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.findIndex called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;

		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return i;
			}
		}
		return -1;
	};
};

if (!Array.prototype.find) {
	Array.prototype.find = function(predicate) {
		if (this == null) {
			throw new TypeError('Array.prototype.find called on null or undefined');
		}
		if (typeof predicate !== 'function') {
			throw new TypeError('predicate must be a function');
		}
		var list = Object(this);
		var length = list.length >>> 0;
		var thisArg = arguments[1];
		var value;

		for (var i = 0; i < length; i++) {
			value = list[i];
			if (predicate.call(thisArg, value, i, list)) {
				return value;
			}
		}
		return undefined;
	};
};

function Database() {
	this.items = [];
	this.dataMap = {};
	this.myId = 'id';
	this.events = new EventEmitter();
}

Database.prototype = Object.create(App.prototype)

Database.prototype.dataAdd = function (item) {
	var id = this.dataGetItemId(item);
	if (this.dataMap[id]) {
		throw new Error('Item with ' + this.myId + ': ' + id + ' - already exists');
	}
	this.items.push(item);
	this.dataMap[id] = item;
	this.emit('data-add', item);
};

Database.prototype.dataRemove = function (item) {
	var id = this.dataGetItemId(item),
		idArr = this.dataFindIndexInArray(this.items, item);
	if (this.dataMap[id]) {
		this.emit('data-del', this.dataMap[id]);
		delete this.dataMap[id];
		this.items.splice(idArr, 1);
	} else {
		throw new Error('Item you trying to delete does not belong to this store');
	}
};

Database.prototype.dataGetItemId = function (item) {
	if (typeof item === 'object' && item[this.myId] !== undefined) {
		return item[this.myId];
	} else if (typeof item === 'string' || typeof item === 'number') {
		return item.toString();
	} else {
		throw new Error('Item must have "' + this.myId + '" attribute');
	}
};

Database.prototype.dataFindIndexInArray = function (items, item) {
	function helper(item) {
		return function (el, i, arr) {
			return el === item;
		}
	}
	return items.findIndex(helper(item));
};

Database.prototype.dataUpdate = function (item, name, val) {
	var id = this.dataGetItemId(item);
	if (!name || !val) throw new Error('Uppdate mast have name or/and value of property');
	this.dataMap[id][name] = val;
	this.emit('data-update', this.dataMap[id]);
};

Database.prototype.dataFindProps = function (prop) {
	if (typeof prop !== 'string') return;
	var result = [];
	function helper (value) {
		result.push(value);
		return result;
	}
	this.helperSearchInArray(this.items, prop, helper, this);
	return result;
};


Database.prototype.emit = function (event, parameters) {
	this.events.emit(event, parameters);
};

Database.prototype.on = function (event, listener) {
	this.events.on(event, listener);
};
