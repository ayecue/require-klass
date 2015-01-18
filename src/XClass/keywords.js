/**
 *	Dependencies
 */
var extend = require('fn/extend'),
	forEach = require('fn/forEach'),
	printf = require('fn/printf'),
	getClass = require('fn/getClass'),
	load = require('fn/load'),
	config = require('cls/config'),
	manager = require('cls/manager'),
	Property = require('prop/property'),
	Properties = require('cls/properties');

/**
 *	Shortcuts
 */
var errorDoubleParent = config.errorDoubleParent,
	synchronousLoading = config.synchronousLoading,
	xclass = manager.xclass;

/**
 *	Keyword operations
 */
var opts = {
		/**
		 *	Extend parent keyword
		 */
		'parent' : function(keyword,value){
			var self = this;

			if (self._parent != null) {
				throw new Error(printf(errorDoubleParent,'name',self.getName()));
			}

			var type = typeof value;

			if (type == 'object') {
				self._parent = value;
			} else if (type == 'string') {
				self._parent = getClass(xclass,value);
			}

			if (self._parent) {
				self._parent.applyTo(self);
			}
		},
		/**
		 *	Extend statics keyword
		 */
		'statics' : function(keyword,value){
			var self = this;

			if (value instanceof Array) {
				forEach(value,function(){
					opts.statics.apply(self,arguments);
				});
			} else {
				forEach(value,function(_,c){
					Property(self,self,_,c);
				});
			}
		},
		/**
		 *	Extend mixins keyword
		 */
		'mixins' : function(keyword,value){
			var self = this;

			forEach(value,function(_,c){
				var type = typeof c;

				if (type == 'object') {
					self._mixins[_] = c;
				} else if (type == 'string') {
					self._mixins[_] = getClass(xclass,c);
				}
			});
		},
		/**
		 *	Extend traits keyword
		 */
		'traits' : function(keyword,value){
			var self = this;

			if (value instanceof Array) {
				forEach(value,function(){
					opts.traits.apply(self,arguments);
				});
			} else {
				var type = typeof value;

				if (type == 'object') {
					Keywords(self,value);
					Properties(self,value);
				} else if (type == 'string') {
					getClass(xclass,value).applyTo(self);
				}
			}
		}
	},
	/**
	 *	Possible internal keywords on class with link to keyword operation 
	 */
	internals = {
		'statics' : opts.statics,
		'mixins' : opts.mixins,
		'traits' : opts.traits,
		'extends' : opts.parent
	};

/**
 *	Extend keywords to class
 */
function Keywords(handle,properties) {
	var getKeywordsOpts = config.getKeywordsOpts;

	if (getKeywordsOpts) {
		extend(internals,getKeywordsOpts.call(internals,opts));
	}

	forEach(internals,function(keyword,internal){
		if (keyword in properties) {
			internal.call(handle,keyword,properties[keyword]);

			properties[keyword] = null;
			delete properties[keyword];
		}
	});
};

module.exports = Keywords;