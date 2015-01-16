var forEach = require('../forEach'),
	extend = require('../extend'),
	config = require('../config'),
	Util = require('../util'),
	Property = require('./Properties/property');

function Keywords(){
	var self = this,
		opts = self.self.opts;

	extend(self,{
		internals : {
			'singleton' : opts.set,
			'debug' : opts.set,
			'autoSetterGetter' : opts.set,
			'extends' : opts.parent,
			'statics' : opts.statics,
			'mixins' : opts.mixins,
			'traits' : opts.traits
		}
	});
}

extend(Keywords,{
	opts : {
		'parent' : function(keyword,value){
			var self = this,
				type = typeof value;

			if (self._parent != null) {
				throw new Error('Double parent');
			}

			if (type == 'object') {
				self._parent = value;
			} else if (type == 'string') {
				self._parent = Util.getClass(config.classPool,value);
			}
		},
		'set' : function(keyword,value){
			this[keyword] = value;
		},
		'statics' : function(keyword,value){
			var self = this;

			if (value instanceof Array) {
				forEach(value,function(){
					Keywords.statics.apply(self,arguments);
				});
			} else {
				forEach(value,function(_,c){
					if (!(_ in self)) {
						Property.compile(self,self,_,c);
					}
				});
			}
		},
		'mixins' : function(keyword,value){
			var self = this;

			if (type == 'object') {
				if (value instanceof Array) {
					forEach(value,function(){
						Keywords.mixins.apply(self,arguments);
					});
				} else {
					self._mixins[keyword] = value;
				}
			} else if (type == 'string') {
				self._mixins[keyword] = Util.getClass(config.classPool,value);
			}
		},
		'traits' : function(keyword,value){
			var self = this;

			if (value instanceof Array) {
				forEach(value,function(){
					Keywords.traits.apply(self,arguments);
				});
			} else {
				forEach(value,function(_,c){
					if (!(_ in self)) {
						self.prototype[_] = c;
					}
				});
			}
		}
	}
});

extend(Keywords.prototype,{
	self : Keywords,
	compile : function(handle,properties) {
		var self = this;

		forEach(self.internals,function(keyword,internal){
			if (keyword in properties) {
				internal.call(handle,keyword,properties[keyword]);

				properties[keyword] = null;
				delete properties[keyword];
			}
		});
	}
});	

module.exports = new Keywords();