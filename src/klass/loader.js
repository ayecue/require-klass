/**
 *	Dependencies
 */
var extend = require('./Functions/extend'),
	forEach = require('./Functions/forEach'),
	prop = require('./Functions/prop'),
	namespace = require('./Functions/namespace'),
	load = require('./Functions/load'),
	dependencyMap = require('./dependency'),
	config = require('./config'),
	merge = require('./merge'),
	register = require('./register');

/**
 *	Shortcuts
 */
var getLoaderProperties = config.getLoaderProperties,
	defaultProperties = {'extends':single,'mixins':object,'traits':array,'requires':array};

function single(value){
	if (typeof value == 'string' && prop(value) === null && prop(value,dependencyMap) === null) {
		namespace(value,{pending:false},dependencyMap);
		return [value];
	}
}

function object(values){
	var result = [];
	return forEach(values,function(_,value){
		var lib = single(value);
		lib && (this.result = result = result.concat(lib));
	});
}

function array(values){
	return values instanceof Array ? object(values) : single(values);
}

module.exports = function(handle,values){
	var libraries = [],
		properties = extend({},defaultProperties),
		className = handle.$classname,
		myState = prop(className,dependencyMap),
		done = function(){
			merge(handle,values);
			register(handle);
			myState.pending = false;
		};

	getLoaderProperties && extend(properties,getLoaderProperties(handle,properties));
	!myState && namespace(handle.$classname,myState = {pending:true},dependencyMap);

	forEach(defaultProperties,function(key,fn){
		if (key in values) {
			var libs = fn(values[key],libraries);
			if (libs) {
				libraries = libraries.concat(libs);
			}
		}
	});

	libraries.length ? load(libraries,done) : done();
};