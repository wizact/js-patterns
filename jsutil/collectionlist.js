function CollectionList() {
	this.list = [];
}

CollectionList.prototype.Add = function( obj ) {
	return this.list.push(obj);
};

CollectionList.prototype.Clear = function() {
	return this.list = [];
};

CollectionList.prototype.Count = function() {
	return this.list.length;
};

CollectionList.prototype.IndexOf = function( obj ) {
	for (var i = 0; i <= this.list.length; i++) {
		if(this.list[i] === obj) {
			return i;
		}
	}

	return -1;
};

CollectionList.prototype.InsertAt = function ( obj, index ) {
	return this.list.splice(index, 0, obj);
};

CollectionList.prototype.RemoveAt = function ( index ) {
	return this.list.splice(index, 1);
};

CollectionList.prototype.Remove = function ( obj ) {
	var index = this.IndexOf(obj);
	if(index > -1) {
		this.RemoveAt(index);
	}
};

CollectionList.prototype.Item = function ( index ) {
	if (index > -1 && index < this.list.length) {
		return this.list[index];
	}
};
