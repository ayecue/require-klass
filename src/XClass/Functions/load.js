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
	req = global.require;

/**
 *	Monkey patch requirejs createNode
 */

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
module.exports = function(id,fn,synchronous){
    var handle = getClass(xclass,id);

    if (handle !== null) {
        return fn(handle);
    }

	var absolutePath = getAbsolutePath(id),
        node = req.load({
        	contextName : '_'
        },absolutePath,absolutePath),
        onload = function( _,failure){
            if (!node) return;
                                        
            var state = node.readyState;
        
            if (failure || !state || /loaded|complete/i.test( state ) ){                   
                node.onerror = node.onload = node.onreadystatechange = null;
                !!node.parentNode && node.parentNode.removeChild( node );
                fn(!failure && getClass(xclass,id));
            }
        };

    extend(node,{
        async : !synchronous,
        onload : onload,
        onreadystatechange : onload,
        onerror : function(_){
            onload(_,true);
        }
    });
};