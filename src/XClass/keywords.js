var forEach = require('fn/forEach'),
	getClass = require('fn/getClass'),
	config = require('cls/config'),
	Property = require('prop/property');

var opts = {
		'parent' : function(keyword,value){
			var self = this,
				type = typeof value;

			if (self._parent != null) {
				throw new Error('Double parent');
			}

			if (type == 'object') {
				self._parent = value;
			} else if (type == 'string') {
				self._parent = getClass(config.classPool,value);
			}
		},
		'set' : function(keyword,value){
			this[keyword] = value;
		},
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
		'mixins' : function(keyword,value){
			var self = this;

			if (value instanceof Array) {
				forEach(value,function(){
					opts.mixins.apply(self,arguments);
				});
			} else {
				forEach(value,function(_,c){
					var type = typeof c;

					if (type == 'object') {
						self._mixins[_] = c;
					} else if (type == 'string') {
						self._mixins[_] = getClass(config.classPool,c);
					}
				});
			}
		},
		'traits' : function(keyword,value){
			var self = this;

			if (value instanceof Array) {
				forEach(value,function(){
					opts.traits.apply(self,arguments);
				});
			} else {
				forEach(value,function(_,c){
					if (!(_ in self.prototype)) {
						Property(self,self.prototype,_,c);
					}
				});
			}
		}
	},
	internals = {
		'singleton' : opts.set,
		'debug' : opts.set,
		'autoSetterGetter' : opts.set,
		'extends' : opts.parent,
		'statics' : opts.statics,
		'mixins' : opts.mixins,
		'traits' : opts.traits
	};

module.exports = function(handle,properties) {
	forEach(internals,function(keyword,internal){
		if (keyword in properties) {
			internal.call(handle,keyword,properties[keyword]);

			properties[keyword] = null;
			delete properties[keyword];
		}
	});
};