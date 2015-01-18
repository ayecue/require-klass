var extend = require('fn/extend'),
	forEach = require('fn/forEach'),
	getClass = require('fn/getClass'),
	config = require('cls/config');

module.exports = extend(config.xclass,{
	config : function(){
		forEach(arguments,function(_,properties){
			extend(config,properties);
		});
	},
	id : require('fn/getId'),
	forEach : forEach,
	toArray : require('fn/toArray'),
	extend : extend,
	printf : require('fn/printf'),
	typeOf : require('fn/typeOf'),
	override : require('fn/override'),
	namespace : require('fn/namespace'),
	require : require('fn/load'),
	listener : require('cls/listener'),
	get : function(path){
		return getClass(this,path);
	},
	define : require('cls/factory')
});