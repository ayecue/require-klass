xclass.define('w.run',{
	statics : {
		testing : function(){
			console.log('wad2');
		}
	},
	foo : function(dd){
		this.logMessage(['test3',dd]);
		return 2;
	},
	moo : function(){
		return 1;
	}
});