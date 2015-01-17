var forEach = require('fn/forEach'),
	toArray = require('fn/toArray'),
	extend = require('fn/extend'),
	config = require('cls/config'),
	templates = require('cls/templates'),
	Keywords = require('cls/keywords'),
	Properties = require('cls/properties'),
	Statics = require('cls/statics'),
	Prototypes = require('cls/prototypes');

function compile(id){
	try {
		return new Function(templates('constructor',{
			id : id
		}))();
		
	} catch(e) {
		throw Error('compile exception code:' + e.message);
	}
}

function initialize(handle){
	extend(handle,Statics());
	extend(handle.prototype,Prototypes(),{
		_class : handle
	});
}

function apply(handle,properties){
	Keywords(handle,properties);
	Properties(handle,properties);
}

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

	return config.classPool[id] = handle;
};