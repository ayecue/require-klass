var extend = require('../../extend'),
	Listener = require('../../listener'),
	evtmgr = require('../../Mixins/evtmgr');

function Method(base,keyword,value){
	var self = this;

	extend(self,{
		'_base' : base,
		'_name' : keyword,
		'_fn' : value,
		'listener' : new Listener(
			'before',
			'after'
		)
	});
}

extend(Method.prototype,{
	self : Method,
	getBase : function(){
		return this._base;
	},
	getName : function(){
		return this._name;
	},
	getFunction : function(){
		return this._fn;
	},
	execute : function(context,args){
		var self = this,
			oldMethod = context._calledMethod;

		context._calledMethod = self;
		self.fire('before',context,[self]);
		result = self.getFunction().apply(context,args);
		self.fire('after',context,[self,result]);
		context._calledMethod = oldMethod;

		return result;
	}
},evtmgr);

module.exports = Method;