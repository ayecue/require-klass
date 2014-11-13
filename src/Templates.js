define(['require','exports','module','./XClass/printf'],function(require, exports, module, printf) {
    var templates = {
	    	constructor : require('./Templates/ConstructorTpl'),
	    	setter : require('./Templates/SetterTpl'),
	    	getter : require('./Templates/GetterTpl')
	    },
	    render = function(name,arg1,arg2){
	    	if (name in templates) {
	    		return printf(templates[name],arg1,arg2);
	    	}

	    	throw Error('No such template (' + name + ') found.');
	    };

    module.exports = render;
});