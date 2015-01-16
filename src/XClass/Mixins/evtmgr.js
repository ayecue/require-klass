module.exports = {
	fire : function(name,ctx,args){
		this.listener.fire(name,ctx,args);
	},
	on : function(name,fn){
		this.listener.on(name,fn);
	},
	once : function(name,fn){
		this.listener.once(name,fn);
	},
	off : function(name,fn){
		this.listener.off(name,fn);
	}
};