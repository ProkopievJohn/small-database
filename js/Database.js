function Database() {
	this.items = [];
	this.dataMap = {};
	this.events = new EventEmitter();
}

Database.prototype.add = function (item) {
	var id = this.getItemId(item);
	if (this.dataMap[id]) {
		throw new Error('Item with id: ' + id + ' - already exists');
	}
	if (!item['name']) item['name'] = 'no name';
/*************************************************/
	item['deladd'] = true;
	this.items.push(item);
	this.dataMap[id] = item;
	this.emit('data', item);
};

Database.prototype.delete = function (item) {
	var id = this.getItemId(item),
		idArr = this.findIndexInArray(this.items, item);
	if (this.dataMap[id]) {
/**************************************************/
		this.dataMap[id]['deladd'] = false;
		this.emit('data', this.dataMap[id]);
		delete this.dataMap[id];
		this.items.splice(idArr, 1);
	} else {
		throw new Error('Item you trying to delete does not belong to this store');
	}
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

Database.prototype.findIndexInArray = function (items, item) {
	function helper(item) {
		return function (el, i, arr) {
			return el === item;
		}
	}
	return items.findIndex(helper(item));
};

Database.prototype.on = function (event, listener) {
	this.events.on(event, listener);
};

Database.prototype.emit = function (event, parameters) {
	this.events.emit(event, parameters);
};
