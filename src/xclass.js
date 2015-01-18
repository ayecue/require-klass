var extend = require('fn/extend'),
	forEach = require('fn/forEach'),
	getClass = require('fn/getClass'),
	load = require('fn/load'),
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
	require : function(libraries,fn){
		if (!(libraries instanceof Array)) {
			libraries = [scripts];
		}

		var index = 0,
			max = libraries.length,
			result = [],
			queue = function(){
				if (index == max) {
					return fn.apply(null,result);
				}

				load(libraries[index++],function(handle){
					result.push(handle);
					queue();
				});
			};

		queue();
	},
	listener : require('cls/listener'),
	get : function(path){
		return getClass(this,path);
	},
	define : require('cls/factory')
});