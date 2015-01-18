/**
 *	Dependencies
 */
var forEach = require('fn/forEach');

/**
 *	Micro Listener Object
 */
function Listener(){
	this.pool = {};
}

/**
 *	Extend prototypes
 */
Listener.prototype = {
	/**
	 *	Register event
	 */
	on : function(name,fn){
		var self = this;
		self.pool[name] = self.pool[name] || [];
		self.pool[name].push(fn);
	},
	/**
	 *	Trigger event
	 */
	fire : function(name,ctx,args){
		var self = this;
		if (name in self.pool){
			forEach(self.pool[name],function(_,fn){
				fn.apply(ctx,args);
			});
		}
	},
	/**
	 *	Unregister event
	 */
	off : function(name,fn){
		var self = this;
		if (name in self.pool){
			var index = self.pool[name].indexOf(fn);
			index != -1 && self.pool[name].splice(index,1);
		}
	}
};

module.exports = Listener;