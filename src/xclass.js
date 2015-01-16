var forEach = require('./XClass/forEach'),
	toArray = require('./XClass/toArray'),
	extend = require('./XClass/extend'),
	printf = require('./XClass/printf'),
	Factory = require('./XClass/factory');

module.exports = {
	forEach : forEach,
	toArray : toArray,
	extend : extend,
	printf : printf,
	define : function(){
		return Factory.create.apply(Factory,arguments);
	}
};