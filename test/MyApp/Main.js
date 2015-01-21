klass.define('MyApp.Main',{
	extends : 'MyApp.Base',
	singleton : true,
	mixins : {
		Base : 'MyApp.Base'
	},
	constructor : function(){
		var base = new MyApp.Base();

		base.write();
	}
});