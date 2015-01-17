/**
 *	Dependencies
 */
var forEach = require('fn/forEach'),
	printf = require('fn/printf'),
	config = require('cls/config'),
	templates = require('cls/templates');

/**
 *	Create automatic setter/getter for class
 */
module.exports = function(properties){
	var self = this;

	forEach(properties,function(keyword,value){
		if (typeof value != 'function') {
			var setterName = printf(config.setterNameTpl,'keyword',keyword),
				getterName = printf(config.getterNameTpl,'keyword',keyword);

			if (!(setterName in self)) {
				var template = templates('setter','keyword',keyword),
					constructor = new Function(template);

				self[setterName] = constructor();
			}

			if (!(getterName in self)) {
				var template = templates('getter','keyword',keyword),
					constructor = new Function(template);

				self[getterName] = constructor();
			}
		}
	});
}