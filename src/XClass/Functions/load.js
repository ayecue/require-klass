/**
 *	Dependencies
 */
var extend = require('fn/extend'),
    forEach = require('fn/forEach'),
	printf = require('fn/printf'),
	getClass = require('fn/getClass'),
	config = require('cls/config'),
    manager = require('cls/manager'),
    Listener = require('cls/listener');

/**
 *	Shortcuts
 */
var loadFileTpl = config.loadFileTpl,
	xclass = manager.xclass,
	req = global.require,
    pending = manager.pending;

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
    
    if (id in pending) {
        return pending[id].on('ready',fn);
    }

	var absolutePath = getAbsolutePath(id),
        listener = pending[id] = new Listener(),
        node = req.load({
        	contextName : '_'
        },absolutePath,absolutePath),
        onload = function( _,failure){
            if (!node) return;
                                        
            var state = node.readyState;
        
            if (failure || !state || /loaded|complete/i.test( state ) ){   
                pending[id] = node.onerror = node.onload = node.onreadystatechange = null;
                delete pending[id];
                !!node.parentNode && node.parentNode.removeChild( node );
                listener.fire('ready',null,[!failure && getClass(xclass,id)]);
            }
        };

    listener.on('ready',fn);

    extend(node,{
        async : !synchronous,
        onload : onload,
        onreadystatechange : onload,
        onerror : function(_){
            onload(_,true);
        }
    });
};