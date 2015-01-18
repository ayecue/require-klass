/**
 *	Dependencies
 */
var forEach = require('fn/forEach'),
	callParent = require('fn/callParent'),
	config = require('cls/config'),
	Listener = require('cls/listener'),
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
		listener : new Listener(),
		_pending : false,
		_mixins : {},
		/**
		 *	Default methods
		 */
		getClass : function(){
			return this;
		},
		getListener : function(){
			return this.listener;
		},
		getPending : function(){
			return this._pending;
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
		applyTo : function(handle,force){
			var parent = this;

			if (parent) {
				forEach(parent,function(keyword,value){
					if (!(keyword in handle) || force) {
						handle[keyword] = value;
					}
				});

				forEach(parent.prototype,function(keyword,value){
					if (!(keyword in handle.prototype) || force) {
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