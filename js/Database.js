function Database() {
	this.items = [];
	this.dataMap = {};
	this.eventEmitter = new EventEmitter();
}

Database.prototype.add = function (item) {
	var id = this.getItemId(item);
	if (this.dataMap[id]) {
		throw new Error('Item with id: ' + id + ' - already exists');
	}
	this.items.push(item);
	this.dataMap[id] = item;

	this.emit('data-' + id, item);
};

Database.prototype.getItemId = function (item) {
	if (typeof item === 'object' && item['id'] !== undefined) {
		return item['id'];
	} else if (typeof item === 'string' || typeof item === 'number') {
		return item.toString();
	} else {
		throw new Error('Item must have "id" attribute');
	}
};

Database.prototype.delete = function (item) {
	var id = this.getItemId(item),
		idArr = this.findIndexInArray(this.items, item);
	if (this.dataMap[id]) {
		delete this.dataMap[id];
		this.items.splice(idArr, 1);
		this.emit('data-' + id, item);
	} else {
		throw new Error('Item you trying to delete does not belong to this store');
	}
};

Database.prototype.findIndexInArray = function (items, item) {
	function helper(item) {
		return function (el, i, arr) {
			return el === item;
		}
	}
	return items.findIndex(helper(item));
};

Database.prototype.findEl = function (id) {
	if (typeof id === 'string' || typeof id === 'number') {
		return this.dataMap[id];
	}
};

Database.prototype.on = function (event, listener) {
	this.eventEmitter.on(event, listener);
};

Database.prototype.emit = function (event, parameters) {
	this.eventEmitter.emit(event, parameters)
};
