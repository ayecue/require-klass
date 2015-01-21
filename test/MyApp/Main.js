klass.define('MyApp.Main',{
	extends : 'MyApp.Base',
	singleton : true,
	mixins : {
		Base : 'MyApp.Base'
	},
	traits : [
		'MyApp.Event'
	],
	constructor : function(){
		var base = new MyApp.Base();

		base.write();
	}
});