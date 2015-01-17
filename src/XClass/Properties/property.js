/**
 *	Dependencies
 */
var extend = require('fn/extend'),
	typeOf = require('fn/typeOf'),
	Method = require('prop/method'),
	Logger = require('cls/logger');

/**
 *	Operations for extending properties
 */
var opts = {
	/**
	 *	Extend function
	 */
	'function' : function(source,target,keyword,value){
		var method = Method(source,keyword,value);
	
		if (source.isDebug()) {
			method._listener.on('before',function(base){
				Logger(this,'start');
			});
			method._listener.on('after',function(base,result){
				Logger(this,['returns:',result]);
			});
		}

		target[keyword] = function(){
			return method(this,arguments);
		};
	},
	/**
	 *	Extend default
	 */
	'default' : function(source,target,keyword,value){
		(target.isPrototypeObject ? target.getDefaultValues() : target)[keyword] = value;
	}
};

/**
 *	Execute property operation
 */
module.exports = function(source,target,keyword,value) {
	(opts[typeOf(value)] || opts['default']).apply(null,arguments);
};