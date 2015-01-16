var forEach = require('./forEach'),
	extend = require('./extend');

function Util(){

}

extend(Util.prototype,{
	getId : function(){
		return 'class#' + Math.random().toString(36);
	},
	getClass : function(root,path,delimiter){
		var splitted = path.split(delimiter || '.');
		
		return forEach(splitted,function(_,className){
			if (className in this.result) {
				this.result = this.result[className];
			} else {
				this.result = null;
				this.skip = true;
			}
		},root);
	},
	getTypeOf : function(x){
	    var c = x.constructor;
	    
	    return (c.name || (/function ([^\(]+)/i.exec(c.toString()) && (c.name = RegExp.$1))).toLowerCase();
	}
});

module.exports = new Util();