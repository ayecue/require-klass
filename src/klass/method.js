/**
 *	Dependencies
 */
var extend = require('./Functions/extend'),
	stack = require('./stack'),
	Listener = require('./listener');

/**
 *	Create method for class
 */
module.exports = function(klass,keyword,fn){
	var listener = new Listener(),
		method = function(context,args){
			var self = this;

			stack.p(method);
			listener.fire('before',context,[self]);
			result = fn.apply(context,args);
			listener.fire('after',context,[self,result]);
			stack.r();

			return result;
		};

	return extend(method,{
		$next : null,
		$last : null,
		$klass : klass,
		$name : keyword,
		$function : fn,
		$listener : listener
	});
};