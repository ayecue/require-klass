/**
 *	Dependencies
 */
var extend = require('fn/extend'),
	forEach = require('fn/forEach'),
	printf = require('fn/printf'),
	getClass = require('fn/getClass'),
	load = require('fn/load'),
	config = require('cls/config'),
	Property = require('prop/property'),
	Properties = require('cls/properties');

/**
 *	Shortcuts
 */
var errorDoubleParent = config.errorDoubleParent,
	synchronousLoading = config.synchronousLoading,
	xclass = config.xclass;

/**
 *	Keyword operations
 */
var opts = {
		/**
		 *	Extend parent keyword
		 */
		'parent' : function(keyword,value){
			var self = this,
				type = typeof value;

			if (self._parent != null) {
				throw new Error(printf(errorDoubleParent,'name',self.getName()));
			}

			if (type == 'object') {
				self._parent = value;
			} else if (type == 'string') {
				self._parent = opts.requires.call(self,null,value);
			}
		},
		/**
		 *	Extend default keyword
		 */
		'set' : function(keyword,value){
			this[keyword] = value;
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
					if (!(_ in self)) {
						Property(self,self,_,c);
					}
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
					self._mixins[_] = opts.requires.call(self,null,c);
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
					opts.requires.call(self,null,value).applyTo(self);
				}
			}
		},
		/**
		 *	Require keyword
		 */
		'requires' : function(keyword,value){
			var self = this,
				result;

			if (value instanceof Array) {
				return forEach(value,function(){
					this.result.push(opts.requires.apply(self,arguments));
				},[]);
			} else {
				load(value,function(handle){
					result = handle;
				},synchronousLoading);
			}

			return result;
		}
	},
	/**
	 *	Possible internal keywords on class with link to keyword operation 
	 */
	internals = {
		'singleton' : opts.set,
		'debug' : opts.set,
		'autoSetterGetter' : opts.set,
		'extends' : opts.parent,
		'statics' : opts.statics,
		'mixins' : opts.mixins,
		'traits' : opts.traits,
		'requires' : opts.requires
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