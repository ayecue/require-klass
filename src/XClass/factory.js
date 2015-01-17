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
	templates = require('cls/templates'),
	Keywords = require('cls/keywords'),
	Properties = require('cls/properties'),
	Statics = require('cls/statics'),
	Prototypes = require('cls/prototypes');

/**
 *	Shortcuts
 */
var xclass = config.xclass,
	errorAlreadyDefined = config.errorAlreadyDefined,
	errorEval = config.errorEval;

/**
 *	Create base class
 */
function compile(id){
	if (getClass(xclass,id) !== null) {
		throw Error(printf(errorAlreadyDefined,'id',id));
	}

	namespace(id);

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
 *	Add default static/prototype method to base class
 */
function initialize(handle){
	extend(handle,Statics(handle));
	extend(handle.prototype,Prototypes(handle));
}

/**
 *	Extend keywords and properties to base class
 */
function apply(handle,properties){
	Keywords(handle,properties);
	Properties(handle,properties);
}

/**
 *	Create pseudo class
 */
module.exports = function(){
	var args = toArray(arguments),
		id = typeof args[0] == 'string' ? args.shift() : null,
		handle = compile(id);
	
	initialize(handle);

	forEach(args,function(_,properties){
		apply(handle,properties);
	});

	var parent = handle.getParent();

	if (parent) {
		parent.applyTo(handle);
	}

	return handle;
};