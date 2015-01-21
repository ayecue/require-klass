/**
 *	Dependencies
 */
var forEach = require('./forEach'),
    toArray = require('./toArray'),
	printf = require('./printf'),
	prop = require('./prop'),
    dependencyMap = require('../dependency');

/**
 *	Shortcuts
 */
var loadFileTpl = '%path%.js',
	req = global.require;

/**
 *	Get path to file
 */
function getAbsolutePath(name){
	return req.toUrl(printf(loadFileTpl,'path',name.replace('.','/')));
}

/**
 *	Load class
 */
module.exports = function(libraries,fn){
    req(forEach(libraries,function(_,name){
        this.result.push(getAbsolutePath(name));
    },[]),function(){
        var args = [].concat(libraries),
            queue = function(){
                var handles = forEach([].concat(args),function(_,name){
                    var state = prop(name,dependencyMap);

                    if (!state) {
                        args.splice(_,1);
                    } else if (state && !state.pending) {
                        this.result.push(prop(name));
                    } else {
                        this.result = false;
                        this.skip = true;
                    }
                },[]);

                handles ? fn.apply(null,handles) : setTimeout(queue);
            };

        queue();
    });
};