define(function(require, exports, module) {
	/**
	 * 	Shortcuts
	 */
	var _arr = Array;
	
    var toArray = 'slice' in _arr.prototype ? function(n){
		return _arr.prototype.slice.call(n,0);
	} : function(n){
		var t = [];
		
		_arr.push.apply(t,n);
		
		return t;
	};

    module.exports = toArray;
});