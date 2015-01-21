/**
 *	Dependencies
 */
var extend = require('klass/Functions/extend'),
	forEach = require('klass/Functions/forEach'),
	prop = require('klass/Functions/prop'),
	namespace = require('klass/Functions/namespace'),
	config = require('klass/config');

module.exports = {
	config : function(){
		forEach(arguments,function(_,properties){
			extend(config,properties);
		});
	},
	id : require('klass/Functions/id'),
	forEach : forEach,
	toArray : require('klass/Functions/toArray'),
	extend : extend,
	printf : require('klass/Functions/printf'),
	typeOf : require('klass/Functions/typeOf'),
	override : require('klass/Functions/override'),
	namespace : function() {
		forEach(arguments,function(_,name){
			namespace(name);
		});
	},
	require : require('klass/Functions/load'),
	listener : require('klass/listener'),
	get : function(name){
		return prop(name);
	},
	define : require('klass/factory')
};