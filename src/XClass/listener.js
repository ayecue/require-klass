var forEach = require('./forEach'),
	extend = require('./extend'),
	Event = require('./event');

function Listener(){
	var self = this;

	extend(this,{
		pool : {}
	});

	self.register.apply(self,arguments);
}

extend(Listener.prototype,{
	self : Listener,
	register : function(){
		var self = this;

		forEach(arguments,function(_,name){
			if (!self.get(name)) {
				self.pool[name] = new Event();
			}
		});

		return self;
	},
	get : function(name){
		var self = this;

		if (name in self.pool) {
			return self.pool[name];
		}
	},
	filter : function(){
		var self = this;
		
		return _forEach(arguments,function(){
			var _event = self.get(name);

			if (_event) {
				this.result.pool[name] = _event;
			}
		},new self.self());
	},
	remove : function(){
		var self = this;

		_forEach(arguments,function(_,name){
			var _event = self.get(name);

			if (_event) {
				_event.destroy();

				self.pool[name] = null;
				delete self.pool[name];
			}
		});

		return self;
	},
	on : function(name,obj){
		var self = this,
			_event = self.get(name);

		if (_event) {
			_event.add(obj);
		}

		return self;
	},
	once : function(name,fn){
		return this.on(name,{
			once : true,
			callback : fn
		});
	},
	fire : function(name,ctx,args){
		var self = this,
			_event = self.get(name);

		if (_event) {
			_event.fire(ctx,args);
		}

		return self;
	},
	off : function(name,fn){
		var self = this,
			_event = self.get(name);

		if (_event) {
			_event.remove(fn);
		}

		return self;
	},
	clear : function(){
		var self = this;

		forEach(arguments,function(_,name){
			var _event = self.get(name);

			if (_event) {
				_event.clear();
			}
		});

		return self;
	},
	clearAll : function(){
		var self = this;

		forEach(self.pool,function(_,pool){
			pool.clear();
		});

		return self;
	},
	destroy : function(){
		var self = this;

		//clear vars
		forEach(self.pool,function(_,pool){
			pool.destroy();
		});

		self.pool = null;
		delete self.pool;
	}
});

module.exports = Listener;