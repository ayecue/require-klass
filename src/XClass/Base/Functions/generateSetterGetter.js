var forEach = require('../../forEach'),
	printf = require('../../printf'),
	config = require('../../config'),
	templates = require('../../templates');

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