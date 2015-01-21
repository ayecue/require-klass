/**
 *	Dependencies
 */
var forEach = require('./Functions/forEach'),
	callParent = require('./Functions/parent'),
	config = require('./config'),
	logger = require('./logger'),
	stack = require('./stack'),
	Listener = require('./listener');

/**
 *	Default class statics
 */
module.exports = function(name,handle){
	var statics = {
		/**
		 *	Default variables
		 */
		singleton : config.defaultSingleton,
		debug : config.defaultDebugging,
		autoSetterGetter : config.defaultAutoSetterGetter,
		listener : new Listener(),
		$classname : name,
		$mixins : {},
		/**
		 *	Default methods
		 */
		getClass : function(){
			return this;
		},
		getListener : function(){
			return this.listener;
		},
		getMixins : function(){
			return this.$mixins;
		},
		getCalledMethod : function(){
			return stack.g();
		},
		getCalledMethodKlass : function(){
			var calledMethod = this.getCalledMethod();
			return calledMethod && calledMethod.$klass;
		},
		getCalledMethodName : function(){
			var calledMethod = this.getCalledMethod();
			return calledMethod && calledMethod.$name;
		},
		getCalledMethodFunction : function(){
			var calledMethod = this.getCalledMethod();
			return calledMethod && calledMethod.$function;
		},
		getCalledMethodBefore : function(){
			var calledMethod = this.getCalledMethod();
			return calledMethod && calledMethod.$last;
		},
		callParent : function(args){
			callParent.call(this,args);
		},
		getParent : function(){
			return this.$parent;
		},
		getName : function(){
			return this.$classname;
		},
		logMessage : function(args,error){
			logger(this,args,error);
		},
		isDebug : function(){
			return this.debug;
		},
		applyTo : function(handle,force){
			var parent = this;

			if (parent) {
				forEach(parent,function(keyword,value){
					(!(keyword in handle) || force) && (handle[keyword] = value);
				});

				forEach(parent.prototype,function(keyword,value){
					(!(keyword in handle.prototype) || force) && (handle.prototype[keyword] = value);
				});
			}
		}
	};

	/**
	 *	Merge with config statics
	 */
	var getStatics = config.getStatics;
	getStatics && extend(statics,getStatics.call(statics,handle));

	return statics;
};