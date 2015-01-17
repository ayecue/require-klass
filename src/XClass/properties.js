var forEach = require('fn/forEach'),
	Property = require('prop/property');

module.exports = function(handle,properties) {
	forEach(properties,function(keyword,value){
		Property(handle,handle.prototype,keyword,value);
	});
};