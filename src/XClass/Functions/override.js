/**
 *	Dependencies
 */
var forEach = require('fn/forEach'),
	toArray = require('fn/toArray'),
	printf = require('fn/printf'),
	getClass = require('fn/getClass'),
	config = require('cls/config'),
	Properties = require('cls/properties');

/**
 *	Shortcuts
 */
var errorAlreadyDefined = config.errorAlreadyDefined;

/**
 *	Override class
 */
module.exports = function(){
	var args = toArray(arguments),
		id = typeof args[0] == 'string' ? args.shift() : null,
		handle = getClass(this,id);

	if (handle === null) {
		forEach(args,function(_,properties){
			Properties(handle,properties);
		});
	} else {
		throw Error(printf(errorAlreadyDefined,'id',id));
	}

	return handle;
};