/**
 *	Dependencies
 */
var extend = require('fn/extend'),
	forEach = require('fn/forEach'),
	getClass = require('fn/getClass'),
	namespace = require('fn/namespace'),
	config = require('cls/config'),
	manager = require('cls/manager');

/**
 *
 */
module.exports = extend(manager.xclass,{
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
	namespace : function() {
		forEach(arguments,function(_,id){
			namespace(this,id);
		});
	},
	require : require('fn/load'),
	listener : require('cls/listener'),
	get : function(path){
		return getClass(this,path);
	},
	define : require('cls/factory')
});