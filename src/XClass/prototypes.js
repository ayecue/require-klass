/**
 *	Dependencies
 */
var forEach = require('fn/forEach'),
	toArray = require('fn/toArray'),
	extend = require('fn/extend'),
	getClass = require('fn/getClass'),
	callParent = require('fn/callParent'),
	generateSetterGetter = require('fn/generateSetterGetter'),
	Logger = require('cls/logger');

/**
 *	Default class prototypes
 */
module.exports = function(handle){
	return {
		/**
		 *	Default variables
		 */
		_class : handle,
		_defaultValues : {},
		isPrototypeObject : true,
		/**
		 *	Default methods
		 */
		_init : function(){
			var self = this,
				values = self.getDefaultValues();

			forEach(values,function(keyword,value){
				if (value instanceof Array) {
					self[keyword] = [].concat(value);
				} else if (value instanceof Object) {
					self[keyword] = extend({},value);
				} else {
					self[keyword] = value;
				}
			});

			generateSetterGetter.call(self.getClass().prototype,self);
		},
		getDefaultValues : function(){
			return this._defaultValues;
		},
		getClass : function(){
			return this._class;
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
		callParent : function(args){
			callParent.call(this,args,'prototype');
		},
		getParent : function(){
			return this.getClass().getParent();
		},
		getName : function(){
			return this.getClass().getName();
		},
		extend : function(){
			var self = this,
				args = toArray(arguments);

			extend.apply(null,[self].concat(args));
			generateSetterGetter.call(self.getClass().prototype,self);
		},
		logMessage : function(args,error){
			Logger(this,args,error);
		},
		isDebug : function(){
			return this.getClass().isDebug();
		},
		callMixin : function(name,prop,args) {
			var mixins = this.getClass().getMixins();

			if (name in mixins) {
				var fn = getClass(mixins[name],prop);

				if (fn) {
					fn.apply(this,args);
				}
			} 
		}
	};
};