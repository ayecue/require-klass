xclass.define('MyApp.Base',{
	statics : {
		printMe : function(){
			this.logMessage('me');
		}
	},
	write : function(string){
		document.write(string);
	}
});