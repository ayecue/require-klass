var printf = require('./printf'),
	templates = {
    	constructor : require('./Templates/constructorTpl'),
    	setter : require('./Templates/setterTpl'),
    	getter : require('./Templates/getterTpl')
    },
    render = function(name,arg1,arg2){
    	if (name in templates) {
    		return printf(templates[name],arg1,arg2);
    	}

    	throw Error('No such template (' + name + ') found.');
    };

module.exports = render;