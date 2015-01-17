var extend = require('fn/extend'),
	getTypeOf = require('fn/getTypeOf'),
	Method = require('prop/method'),
	Logger = require('cls/logger');

var opts = {
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
	'default' : function(source,target,keyword,value){
		(target.isPrototypeObject ? target.getDefaultValues() : target)[keyword] = value;
	}
};

module.exports = function(source,target,keyword,value) {
	var type = getTypeOf(value);

	(opts[type] || opts['default']).apply(null,arguments);
};