var extend = require('fn/extend'),
	getClass = require('fn/getClass'),
	config = require('cls/config');

module.exports = extend(config.xclass,{
	id : require('fn/getId'),
	forEach : require('fn/forEach'),
	toArray : require('fn/toArray'),
	extend : extend,
	printf : require('fn/printf'),
	typeOf : require('fn/typeOf'),
	override : require('fn/override'),
	namespace : require('fn/namespace'),
	require : require('fn/load'),
	getClass : function(path){
		return getClass(this,path);
	},
	define : require('cls/factory')
});