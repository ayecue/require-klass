/**
 *	Dependencies
 */
var forEach = require('./forEach'),
	toArray = require('./toArray'),
	printf = require('./printf'),
	prop = require('./prop'),
	errors = require('../errors'),
	merge = require('../merge');

/**
 *	Override class
 */
module.exports = function(){
	var args = toArray(arguments),
		id = typeof args[0] == 'string' ? args.shift() : null,
		handle = prop(id);

	if (handle !== null) {
		forEach(args,function(_,values){
			merge(handle,values);
		});
	} else {
		throw Error(printf(errors.noClassFound,'name',id));
	}

	return handle;
};