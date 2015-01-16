var extend = require('../../extend'),
	Method = require('./method'),
	Util = require('../../util'),
	Logger = require('../../logger');

function Property(){
}

extend(Property,{
	opts : {
		'function' : function(source,target,keyword,value){
			var method = new Method(source,keyword,value);
		
			if (source.isDebug()) {
				method.on('before',function(base){
					Logger.print(this,'start');
				});
				method.on('after',function(base,result){
					Logger.print(this,['returns:',result]);
				});
			}

			target[keyword] = function(){
				return method.execute(this,arguments);
			};
		},
		'default' : function(source,target,keyword,value){
			(target.isPrototypeObject ? target.getDefaultValues() : target)[keyword] = value;
		}
	}
});

extend(Property.prototype,{
	self : Property,
	compile : function(source,target,keyword,value) {
		var opts = this.self.opts,
			type = Util.getTypeOf(value);

		(opts[type] || opts['default']).apply(null,arguments);
	}
});

module.exports = new Property();