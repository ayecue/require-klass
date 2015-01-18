/**
 *	Dependencies
 */
var extend = require('fn/extend'),
    forEach = require('fn/forEach'),
	printf = require('fn/printf'),
	getClass = require('fn/getClass'),
	config = require('cls/config');

/**
 *	Shortcuts
 */
var loadFileTpl = config.loadFileTpl,
	xclass = config.xclass,
	req = global.require,
    pending = {};

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

    var absolutePath = getAbsolutePath(id);

    if (absolutePath in pending) {
        return pending[absolutePath].push(fn);
    }

	var node = req.load({
        	contextName : '_'
        },absolutePath,absolutePath),
        onload = function( _,failure){
            if (!node) return;
                                        
            var state = node.readyState;
        
            if (failure || !state || /loaded|complete/i.test( state ) ){   
                forEach(pending[absolutePath],function(_,fn){
                    fn(!failure && getClass(xclass,id));
                });

                pending[absolutePath] = node.onerror = node.onload = node.onreadystatechange = null;
                !!node.parentNode && node.parentNode.removeChild( node );
            }
        };

    pending[absolutePath] = [fn];

    extend(node,{
        async : !synchronous,
        onload : onload,
        onreadystatechange : onload,
        onerror : function(_){
            onload(_,true);
        }
    });
};