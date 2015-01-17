var printf = require('fn/printf'),
	templates = {
    	constructor : require('tpl/constructorTpl'),
    	setter : require('tpl/setterTpl'),
    	getter : require('tpl/getterTpl')
    },
    render = function(name,arg1,arg2){
    	if (name in templates) {
    		return printf(templates[name],arg1,arg2);
    	}

    	throw Error('No such template (' + name + ') found.');
    };

module.exports = render;