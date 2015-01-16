var extend = require('./extend'),
	Keywords = require('./Base/keywords'),
	Properties = require('./Base/properties'),
	Statics = require('./Base/statics'),
	Prototypes = require('./Base/prototypes');

function Base(handle){
	var self = this;

	extend(self,{
		handle : handle
	});

	self.initialize();
}

extend(Base,{
	getDefaultStatics : function(){
		return Statics;
	},
	getDefaultPrototypes : function(){
		return Prototypes;
	}
});

extend(Base.prototype,{
	self : Base,
	initialize : function(){
		var self = this,
			handle = self.handle;

		extend(handle,self.self.getDefaultStatics());

		extend(handle.prototype,self.self.getDefaultPrototypes(),{
			_class : handle
		});
	},
	extend : function(properties){
		var self = this,
			handle = self.handle;

		Keywords.compile(handle,properties);
		Properties.compile(handle,properties);
	},
	toClass : function(){
		var self = this,
			handle = self.handle,
			parent = handle.getParent();

		if (parent) {
			parent.applyTo(handle);
		}

		return !!handle.singleton ? new handle() : handle;
	},
	getHandle : function(){
		return this.handle;
	}
});

module.exports = Base;