define(function(require, exports, module) {
    var XClass = {},
    	forEach = XClass.forEach = require('./XClass/forEach'),
    	toArray = XClass.toArray = require('./XClass/toArray'),
    	extend = XClass.extend = require('./XClass/extend'),
    	printf = XClass.printf = require('./XClass/printf'),
    	templates = XClass.templates = require('./Templates');

    module.exports = XClass;
});