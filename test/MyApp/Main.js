xclass.define('MyApp.Main',{
	extends : 'MyApp.Base',
	mixins : {
		Base : 'MyApp.Base'
	},
	traits : [
		'MyApp.Base'
	]
});