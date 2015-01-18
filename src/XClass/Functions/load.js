/**
 *	Dependencies
 */
var forEach = require('fn/forEach'),
	printf = require('fn/printf'),
	getClass = require('fn/getClass'),
	config = require('cls/config'),
    manager = require('cls/manager');

/**
 *	Shortcuts
 */
var loadFileTpl = config.loadFileTpl,
	xclass = manager.xclass,
	req = global.require;

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
module.exports = function(libraries,fn){
    if (!(libraries instanceof Array)) {
        libraries = [libraries];
    }

    req(forEach(libraries,function(_,id){
        var handle = getClass(xclass,id);

        if (handle === null) {
            this.result.push(getAbsolutePath(id));
        }
    },[]),function(){
        var queue = function(){
                var handles = forEach(libraries,function(_,id){
                    var handle = getClass(xclass,id);

                    if (handle && !handle._pending) {
                        this.result.push(handle);
                    } else {
                        this.result = false;
                        this.skip = true;
                    }
                },[]);

                if (handles !== false) {
                    return fn.apply(null,handles);
                }

                setTimeout(queue);
            };

        queue();
    });
};