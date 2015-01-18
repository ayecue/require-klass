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
			self.pool[name].splice(self.pool[name].indexOf(fn),1);
		}
	}
};

module.exports = Listener;