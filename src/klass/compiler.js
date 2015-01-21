/**
 *	Dependencies
 */
var forEach = require('./Functions/forEach'),
	printf = require('./Functions/printf'),
	errors = require('./errors');

/**
 *	Shortcuts
 */
var template = 'return function %name%(){this._init && this._init();return this.constructor.apply(this, arguments) || null;};';

module.exports = function(name){
	var property = forEach(name.split('.'),function(_,name){
			this.result.push(printf('%:capitalise:name%','name',name));
		},[]).join(''),
		constructor = printf(template,'name',property);

	try {
		return new Function(constructor)();
	} catch(e) {
		throw Error(printf(errors.eval,{
			code : constructor,
			message : e.message
		}));
	}
}