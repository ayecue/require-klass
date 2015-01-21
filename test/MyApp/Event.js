klass.define('MyApp.Event',{
	on : function(){
		this.listener.on.apply(this.listener,arguments);
	},
	off : function(){
		this.listener.off.apply(this.listener,arguments);
	},
	fire : function(){
		this.listener.fire.apply(this.listener,arguments);
	}
});