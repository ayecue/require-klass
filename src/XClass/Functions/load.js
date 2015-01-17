/**
 *	Dependencies
 */
var extend = require('fn/extend'),
	printf = require('fn/printf'),
	getClass = require('fn/getClass'),
	config = require('cls/config');

/**
 *	Shortcuts
 */
var loadFileTpl = config.loadFileTpl,
	xclass = config.xclass,
    allowMonkeyPatchRequireJS = config.allowMonkeyPatchRequireJS,
	req = global.require;

/**
 *	Monkey patch requirejs createNode
 */
allowMonkeyPatchRequireJS && (function(){
	var createNode = req.createNode;

    req.createNode = function(config){
        var node = createNode.apply(req,arguments);
        node.async = config.async;
        return node;
    };
})();

/**
 *	Get path to file
 */
function getAbsolutePath(id){
	var path = printf(loadFileTpl,'path',id.replace('.','/'));

	return req.toUrl(path);
}

/**
 *	Load class
 */
module.exports = function(id){
	var _class = getClass(xclass,id);

	if (_class !== null) {
		return _class;
	}

	var absolutePath = getAbsolutePath(id),
		xhr;

	if (typeof XMLHttpRequest != 'undefined') {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
		
	try {
        xhr.open('GET', absolutePath, false);
        xhr.send(null);
    } catch (e) {
        req.load({
        	contextName : '_',
        	config : {
        		async : false
        	}
        },absolutePath,absolutePath);
    }

	return getClass(xclass,id);
};