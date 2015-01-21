/**
 *	Dependencies
 */
var forEach = require('./forEach'),
	printf = require('./printf'),
	config = require('../config');

/**
 *	Shortcuts
 */
var setterNameTpl = 'set%:olettersnumber,camelcase:keyword%',
	getterNameTpl = 'get%:olettersnumber,camelcase:keyword%';

/**
 *	Create automatic setter/getter for class
 */
module.exports = function(values){
	var self = this;

	forEach(values,function(keyword,value){
		if (typeof value != 'function') {
			var setterName = printf(setterNameTpl,'keyword',keyword),
				getterName = printf(getterNameTpl,'keyword',keyword);

			!(setterName in self) && (self[setterName] = function(v){this[keyword]=v;return this;});
			!(getterName in self) && (self[getterName] = function(v){return this[keyword];});
		}
	});
}