var toArray = require('./Functions/toArray'),
	extend = require('./Functions/extend'),
	id = require('./Functions/id'),
	compiler = require('./compiler'),
	statics = require('./statics'),
	prototypes = require('./prototypes'),
	loader = require('./loader');

/**
 *	Create pseudo class
 */
module.exports = function(){
	var args = toArray(arguments),
		name = typeof args[0] == 'string' ? args.shift() : null,
		values = args.shift(),
		handle = compiler(name);
	
	extend(handle,statics(name,handle));
	extend(handle.prototype,prototypes(name,handle));
	loader(handle,values);

	return handle;
};