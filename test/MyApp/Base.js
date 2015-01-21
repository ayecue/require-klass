klass.define('MyApp.Base',{
	statics : {
		printMe : function(){
			this.logMessage('me');
		}
	},
	write : function(string){
		this.logMessage('woot');
	}
});