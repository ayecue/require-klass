/**
 *	Dependencies
 */
var forEach = require('fn/forEach'),
	callParent = require('fn/callParent'),
	config = require('cls/config'),
	Logger = require('cls/logger');

/**
 *	Default class statics
 */
module.exports = function(handle){
	var statics = {
		/**
		 *	Default variables
		 */
		singleton : config.defaultSingleton,
		debug : config.defaultDebugging,
		autoSetterGetter : config.defaultAutoSetterGetter,
		_mixins : {},
		/**
		 *	Default methods
		 */
		getClass : function(){
			return this;
		},
		getMixins : function(){
			return this._mixins;
		},
		getCalledMethod : function(){
			return this._calledMethod;
		},
		getCalledMethodBase : function(){
			var calledMethod = this.getCalledMethod();

			return calledMethod && calledMethod._base;
		},
		getCalledMethodName : function(){
			var calledMethod = this.getCalledMethod();

			return calledMethod && calledMethod._name;
		},
		getCalledMethodFunction : function(){
			var calledMethod = this.getCalledMethod();

			return calledMethod && calledMethod._function;
		},
		getParent : function(){
			return this._parent;
		},
		callParent : function(args){
			callParent.call(this,args);
		},
		isDebug : function(){
			return this.debug;
		},
		getName : function(){
			return this.name;
		},
		logMessage : function(args,error){
			Logger(this,args,error);
		},
		applyTo : function(handle){
			var parent = this;

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

	var getStatics = config.getStatics;

	if (getStatics) {
		extend(statics,getStatics.call(statics,handle));
	}

	return statics;
};