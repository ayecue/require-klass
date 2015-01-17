var extend = require('fn/extend'),
	getClass = require('fn/getClass'),
	config = require('cls/config');

module.exports = extend(config.xclass,{
	forEach : require('fn/forEach'),
	toArray : require('fn/toArray'),
	extend : require('fn/extend'),
	printf : require('fn/printf'),
	override : require('cls/override'),
	getClass : function(path){
		return getClass(this,path);
	},
	define : require('cls/factory')
});