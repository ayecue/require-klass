var forEach = require('./forEach'),
	extend = require('./extend'),
	_arr = Array;

function Event(){
	var self = this;

	extend(self,{
		collection : []
	});
}

extend(Event.prototype,{
	add : function(){
		var self = this;
		
		_arr.prototype.push.apply(self.collection,arguments);

		return self;
	},
	fire : function(context,args){
		var self = this,
			collection = [].concat(self.collection);
		
		forEach(collection,function(index,object){
			var type = typeof object;
			
			if (type == 'function') {
				object.apply(context || self,args || arguments);
			} else if (type == 'object') {
				if (object.once === true) {
					self.collection.splice(index,1);
				}

				object.callback.apply(object.context || context || self,object.args || args || arguments);
			}
		});
	},
	indexOf : function(fn){
		var self = this;

		return forEach(self.collection,function(index,object){
			var type = typeof object;

			if ((type == 'function' && object == fn) || (type == 'object' && object.callback == fn)) {
				this.result = index;
				this.skip = true;
			}
		}, -1);
	},
	remove : function(fn){
		var self = this,
			index = self.indexOf(fn);

		if (index != -1) {
			self.collection.splice(index,1);
		}
	},
	clear : function(){
		this.collection = [];
	},
	destroy : function(){
		var self = this;

		//clear vars
		self.collection = null;
	}
});

module.exports = Event;