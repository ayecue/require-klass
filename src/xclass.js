var config = require('cls/config'),
	getClass = require('fn/getClass');

module.exports = {
	forEach : require('fn/forEach'),
	toArray : require('fn/toArray'),
	extend : require('fn/extend'),
	printf : require('fn/printf'),
	getClass : function(path){
		return getClass(config.classPool,path);
	},
	define : require('cls/factory')
};