var forEach = require('fn/forEach'),
	extend = require('fn/extend'),
	Event = require('cls/event');

function Listener(){
	this.pool = {};
}

extend(Listener.prototype,{
	on : function(name,fn){
		var self = this;
		self.pool[name] = self.pool[name] || [];
		self.pool[name].push(fn);
	},
	fire : function(name,ctx,args){
		var self = this;
		if (name in self.pool){
			forEach(self.pool[name],function(_,fn){
				fn.apply(ctx,args);
			});
		}
	},
	off : function(name,fn){
		var self = this;
		if (name in self.pool){
			self.pool[name].splice(self.pool[name].indexOf(fn),1);
		}
	}
});

module.exports = Listener;