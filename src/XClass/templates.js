var printf = require('fn/printf'),
    config = require('cls/config'),
    errorNoTemplateFound = config.errorNoTemplateFound,
	templates = {
    	constructor : require('tpl/constructorTpl'),
    	setter : require('tpl/setterTpl'),
    	getter : require('tpl/getterTpl')
    },
    render = function(name,arg1,arg2){
    	if (name in templates) {
    		return printf(templates[name],arg1,arg2);
    	}

    	throw Error(printf(errorNoTemplateFound,'name',name));
    };

module.exports = render;