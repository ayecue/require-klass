var forEach = require('./forEach'),
	toArray = require('./toArray'),
	extend = require('./extend'),
	config = require('./config'),
	templates = require('./templates'),
	Base = require('./base');

function Factory(){

}

extend(Factory,{
	compile : function(id){
		try {
			return new Function(templates('constructor',{
				id : id
			}))();
			
		} catch(e) {
			throw Error('compile exception code:' + e.message);
		}
	}
});

extend(Factory.prototype,{
	self : Factory,
	create : function(){
		var self = this,
			args = toArray(arguments),
			id = typeof args[0] == 'string' ? args.shift() : null,
			handle = self.self.compile(id),
			base = new Base(handle);

		forEach(args,function(_,properties){
			base.extend(properties);
		});

		return config.classPool[id] = base.toClass();
	}

});

module.exports = new Factory();