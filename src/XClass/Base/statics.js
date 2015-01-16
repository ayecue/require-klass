var forEach = require('../forEach'),
	callParent = require('./Functions/callParent'),
	config = require('../config'),
	Logger = require('../logger');

module.exports = {
	//vars
	_deepLoggingLevel : config.defaultDeepLoggingLevel,
	_debug : config.defaultDebugging,
	_autoSetterGetter : config.defaultAutoSetterGetter,
	_mixins : {},
	//methods
	getClass : function(){
		return this;
	},
	getCalledMethod : function(){
		return this._calledMethod;
	},
	getCalledMethodBase : function(){
		var calledMethod = this.getCalledMethod();

		return calledMethod && calledMethod.getBase();
	},
	getCalledMethodName : function(){
		var calledMethod = this.getCalledMethod();

		return calledMethod && calledMethod.getName();
	},
	getCalledMethodFunction : function(){
		var calledMethod = this.getCalledMethod();

		return calledMethod && calledMethod.getFunction();
	},
	getParent : function(){
		return this._parent;
	},
	callParent : function(args){
		callParent.call(this,args);
	},
	isDebug : function(){
		return this._debug;
	},
	getName : function(){
		return this.name;
	},
	logMessage : function(args,error){
		Logger.print(this,args,error);
	},
	applyTo : function(handle){
		var parent = self;

		if (parent) {
			forEach(parent,function(keyword,value){
				if (!(keyword in handle)) {
					handle[keyword] = value;
				}
			});

			forEach(parent.prototype,function(keyword,value){
				if (!(keyword in handle.prototype)) {
					handle.prototype[keyword] = value;
				}
			});
		}
	}
};