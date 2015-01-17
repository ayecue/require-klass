var forEach = require('fn/forEach'),
	toArray = require('fn/toArray'),
	extend = require('fn/extend'),
	getClass = require('fn/getClass'),
	config = require('cls/config'),
	templates = require('cls/templates'),
	Keywords = require('cls/keywords'),
	Properties = require('cls/properties'),
	Statics = require('cls/statics'),
	Prototypes = require('cls/prototypes');

var xclass = config.xclass,
	errorAlreadyDefined = config.errorAlreadyDefined,
	errorEval = config.errorEval;

function compile(id){
	if (getClass(xclass,id) != null) {
		throw Error(printf(errorAlreadyDefined,'id',id));
	}

	var path = getNamespace(id),
		constructor = templates('constructor',{
			id : path.namespace
		});

	try {
		return path.property[path.namespace] = new Function(constructor)();
	} catch(e) {
		throw Error(printf(errorEval,{
			code : constructor,
			message : e.message
		}));
	}
}

function getNamespace(id){
	var namespaces = id.split('.'),
		max = namespaces.length - 1;

	return forEach(namespaces,function(index,value){
		if (index == max) {
			this.result.namespace = value;
		} else {
			this.result.property = this.result.property[value] || (this.result.property[value] = {});
		}
	},{
		property : xclass
	});
}

function initialize(handle){
	extend(handle,Statics(handle));
	extend(handle.prototype,Prototypes(handle));
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

	return handle;
};