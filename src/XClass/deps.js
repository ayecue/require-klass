/**
 *	Dependencies
 */
var extend = require('fn/extend'),
	forEach = require('fn/forEach'),
	getClass = require('fn/getClass'),
	load = require('fn/load'),
	manager = require('cls/manager');

/**
 *	Shortcuts
 */
var xclass = manager.xclass;

/**
 *	Keyword operations
 */
var opts = {
		/**
		 *	Extend parent keyword
		 */
		'parent' : function(value){
			var self = this,
				result = [];

			if (typeof value == 'string') {
				var handle = getClass(xclass,value);

				if (!handle) {
					result.push(value);
				}
			}

			return result;
		},
		/**
		 *	Extend mixins keyword
		 */
		'mixins' : function(value){
			var self = this;

			return forEach(value,function(_,c){
				if (typeof c == 'string') {
					var handle = getClass(xclass,c);

					if (!handle) {
						this.result.push(c);
					}
				}
			},[]);
		},
		/**
		 *	Extend traits keyword
		 */
		'traits' : function(value){
			var self = this,
				result = value || [];

			if (value instanceof Array) {
				forEach(value,function(){
					result = result.concat(opts.traits.apply(self,arguments));
				});
			} else {
				if (typeof value == 'string') {
					var handle = getClass(xclass,value);

					if (!handle) {
						result.push(value);
					}
				}
			}

			return result;
		}
	},
	/**
	 *	Possible internal keywords on class with link to keyword operation 
	 */
	internals = {
		'mixins' : opts.mixins,
		'traits' : opts.traits,
		'extends' : opts.parent
	};

/**
 *	Extend keywords to class
 */
function Deps(handle,properties,fn) {
	var reqs = properties.requires || [];

	properties.requires = null;
	delete properties.requires;

	forEach(internals,function(keyword,internal){
		if (keyword in properties) {
			reqs = reqs.concat(internal.call(handle,properties[keyword]));
		}
	});

	handle._pending = true;
	handle.listener.fire('pending',handle);
	load(reqs,function(){
		handle._pending = false;
		fn(handle);
		handle.listener.fire('loaded',handle);
	});
};

module.exports = Deps;