function Database() {
	this.items = [];
	this.dataMap = {};
	this.myId = 'id';
	this.events = new EventEmitter();
}

Database.prototype = Object.create(App.prototype);

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
	this.helperSearchInArray(this.items, prop, helper);
	return result;
};

Database.prototype.helperSearchInArray = function (obj, key, callback) {
	for (var i in obj) {
		if (i == key) {
			callback(obj[i]);
		} else if (typeof obj[i] == "object" && Object.keys(obj[i]).length > 0) {
			this.helperSearchInArray(obj[i], key, callback);
		}
	}
};

Database.prototype.emit = function (event, parameters) {
	this.events.emit(event, parameters);
};

Database.prototype.on = function (event, listener) {
	this.events.on(event, listener);
};
