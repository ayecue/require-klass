var extend = require('fn/extend'),
	Listener = require('cls/listener');

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

	method._base = base;
	method._name = keyword;
	method._function = fn;
	method._listener = listener;

	return method;
};