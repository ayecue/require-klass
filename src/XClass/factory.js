/**
 *	Dependencies
 */
var forEach = require('fn/forEach'),
	toArray = require('fn/toArray'),
	extend = require('fn/extend'),
	printf = require('fn/printf'),
	getClass = require('fn/getClass'),
	namespace = require('fn/namespace'),
	config = require('cls/config'),
	manager = require('cls/manager'),
	templates = require('cls/templates'),
	Keywords = require('cls/keywords'),
	Properties = require('cls/properties'),
	Statics = require('cls/statics'),
	Prototypes = require('cls/prototypes');

/**
 *	Shortcuts
 */
var xclass = manager.xclass,
	errorAlreadyDefined = config.errorAlreadyDefined,
	errorEval = config.errorEval;

/**
 *	Create base class
 */
function compile(id){
	if (getClass(xclass,id) !== null) {
		throw Error(printf(errorAlreadyDefined,'id',id));
	}

	namespace(xclass,id);

	var splitted = id.split('.'),
		property = splitted.pop(),
		path = splitted.join('.'),
		root = getClass(xclass,path) || xclass,
		constructor = templates('constructor',{
			id : property
		});

	try {
		return root[property] = new Function(constructor)();
	} catch(e) {
		throw Error(printf(errorEval,{
			code : constructor,
			message : e.message
		}));
	}
}

/**
 *	Create pseudo class
 */
module.exports = function(){
	var args = toArray(arguments),
		id = typeof args[0] == 'string' ? args.shift() : null,
		handle = compile(id);
	
	extend(handle,Statics(handle));
	extend(handle.prototype,Prototypes(handle));

	forEach(args,function(_,properties){
		Keywords(handle,properties);
		Properties(handle,properties);
	});

	return !!handle.singleton ? new handle() : handle;
};