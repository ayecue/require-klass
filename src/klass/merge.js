/**
 *	Dependencies
 */
var extend = require('./Functions/extend'),
	forEach = require('./Functions/forEach'),
	printf = require('./Functions/printf'),
	typeOf = require('./Functions/typeOf'),
	prop = require('./Functions/prop'),
	property = require('./property'),
	config = require('./config');

/**
 *	Shortcuts
 */
var tObject = 'object',
	tString = 'string',
	tArray = 'array',
	parentKey = '$parent',
	mixinsKey = '$mixins',
	defaultKeywordProperties = {
		'singleton' : set,
		'debug' : set,
		'autoSetterGetter' : set,
		'requires' : set,
		'mixins':mixins,
		'traits':traits,
		'statics':statics,
		'extends':parent
	};

function set(keyword,value){
	this[keyword] = value;
}

function parent(keyword,value){
	var self = this,
		type = typeOf(value);

	if (type == tObject) {
		self[parentKey] = value;
	} else if (type == tString) {
		self[parentKey] = prop(value);
	}

	self[parentKey] && self[parentKey].applyTo(self);
}

function statics(keyword,value){
	var self = this;

	typeOf(value) == tArray ? forEach(value,function(){
		statics.apply(self,arguments);
	}) : forEach(value,function(_,c){
		property(self,self,_,c);
	});
}

function mixins(keyword,value){
	var self = this;

	forEach(value,function(_,c){
		var type = typeOf(c);

		if (type == tObject) {
			self[mixinsKey][_] = c;
		} else if (type == tString) {
			self[mixinsKey][_] = prop(c);
		}
	});
}

function traits(keyword,value){
	var self = this,
		type = typeOf(value);

	if (type == tArray) {
		forEach(value,function(){
			traits.apply(self,arguments);
		});
	} else {
		if (type == tObject) {
			merge(self,value);
		} else if (type == tString) {
			prop(value).applyTo(self);
		}
	}
}

function merge(handle,values){
	var keywordProperties = extend({},defaultKeywordProperties),
		getKeywords = config.getKeywords;

	getKeywords && extend(keywordProperties,getKeywords(handle,keywordProperties));

	forEach(keywordProperties,function(keyword,fn){
		if (keyword in values) {
			fn.call(handle,keyword,values[keyword]);
			values[keyword] = null;
			delete values[keyword];
		}
	});

	forEach(values,function(keyword,value){
		property(handle,handle.prototype,keyword,value);
	});
};

module.exports = merge;