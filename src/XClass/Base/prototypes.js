var forEach = require('../forEach'),
	toArray = require('../toArray'),
	extend = require('../extend'),
	callParent = require('./Functions/callParent'),
	generateSetterGetter = require('./Functions/generateSetterGetter'),
	Logger = require('../logger');

module.exports = {
	//vars
	_class : null,
	_defaultValues : {},
	isPrototypeObject : true,
	//methods
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
		Logger.print(this,args,error);
	},
	isDebug : function(){
		return this.getClass().isDebug();
	}
};