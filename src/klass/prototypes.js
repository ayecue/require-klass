/**
 *	Dependencies
 */
var forEach = require('./Functions/forEach'),
	toArray = require('./Functions/toArray'),
	extend = require('./Functions/extend'),
	prop = require('./Functions/prop'),
	callParent = require('./Functions/parent'),
	auto = require('./Functions/auto'),
	config = require('./config'),
	logger = require('./logger'),
	property = require('./property'),
	Listener = require('./listener');

/**
 *	Default class prototypes
 */
module.exports = function(name,handle){
	var prototypes = {
		/**
		 *	Default variables
		 */
		$class : handle,
		$defaultValues : {},
		isPrototypeObject : true,
		listener : new Listener(),
		/**
		 *	Default methods
		 */
		_init : function(){
			var self = this;
			forEach(self.getDefaultValues(),function(keyword,value){
				if (value instanceof Array) {
					self[keyword] = [].concat(value);
				} else if (value instanceof Object) {
					self[keyword] = extend({},value);
				} else {
					self[keyword] = value;
				}
			});
			self.getClass().autoSetterGetter && auto.call(self.getClass().prototype,self);
		},
		getDefaultValues : function(){
			return this.$defaultValues;
		},
		getClass : function(){
			return this.$class;
		},
		getListener : function(){
			return this.listener;
		},
		getMixins : function(){
			return this.getClass().getMixins();
		},
		getCalledMethod : function(){
			return this.getClass().getCalledMethod();
		},
		getCalledMethodKlass : function(){
			return this.getClass().getCalledMethodKlass();
		},
		getCalledMethodName : function(){
			return this.getClass().getCalledMethodName();
		},
		getCalledMethodFunction : function(){
			return this.getClass().getCalledMethodFunction();
		},
		getCalledMethodBefore : function(){
			return this.getClass().getCalledMethodBefore();
		},
		callParent : function(args){
			callParent.call(this,args,'prototype');
		},
		getParent : function(){
			return this.getClass().getParent();
		},
		getName : function(){
			return this.getClass().getName();
		},
		logMessage : function(args,error){
			logger(this,args,error);
		},
		isDebug : function(){
			return this.getClass().isDebug();
		},
		extend : function(){
			var self = this;
			extend.apply(null,[self].concat(toArray(arguments)));
			self.getClass().autoSetterGetter && auto.call(self.getClass().prototype,self);
		},
		callMixin : function(name,property,args) {
			var mixins = this.getClass().getMixins();

			if (name in mixins) {
				var fn = prop(property,mixins[name]);
				fn && fn.apply(this,args);
			} 
		}
	};

	/**
	 *	Default properties	
	 */
	property(handle,prototypes,'constructor',function(){
		this.callParent(arguments);
	});

	/**
	 *	Merge with config prototypes
	 */
	var getPrototypes = config.getPrototypes;
	getPrototypes && extend(prototypes,getPrototypes.call(prototypes,handle));

	return prototypes;
};