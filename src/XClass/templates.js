/**
 *  Dependencies
 */
var printf = require('fn/printf'),
    config = require('cls/config'),
    constructor = require('tpl/constructorTpl'),
    setter = require('tpl/setterTpl'),
    getter = require('tpl/getterTpl');

/**
 *  Shortcuts
 */
var errorNoTemplateFound = config.errorNoTemplateFound;

/**
 *  Templates
 */
var templates = {
	constructor : constructor,
	setter : setter,
	getter : getter
};

/**
 *  Method to get certain templates
 */
module.exports = function(name,arg1,arg2){
    if (name in templates) {
        return printf(templates[name],arg1,arg2);
    }

    throw Error(printf(errorNoTemplateFound,'name',name));
};