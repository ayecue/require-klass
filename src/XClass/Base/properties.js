var forEach = require('../forEach'),
	extend = require('../extend'),
	Property = require('./Properties/property');

function Properties(){
	
}

extend(Properties.prototype,{
	self : Properties,
	compile : function(handle,properties) {
		var self = this;

		forEach(properties,function(keyword,value){
			Property.compile(handle,handle.prototype,keyword,value);
		});
	}
});	

module.exports = new Properties();