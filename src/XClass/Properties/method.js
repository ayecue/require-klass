/**
 *	Dependencies
 */
var extend = require('fn/extend'),
	Listener = require('cls/listener');

/**
 *	Create method for class
 */
module.exports = function(base,keyword,fn){
	var listener = new Listener(),
		method = function(context,args){
			var self = this,
				oldMethod = context._calledMethod;

			context._calledMethod = method;
			listener.fire('before',context,[self]);
			result = fn.apply(context,args);
			listener.fire('after',context,[self,result]);
			context._calledMethod = oldMethod;

			return result;
		};

	return extend(method,{
		_base : base,
		_name : keyword,
		_function : fn,
		_listener : listener
	});
};