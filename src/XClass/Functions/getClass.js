var forEach = require('fn/forEach');

module.exports = function(root,path,delimiter){
	var splitted = path.split(delimiter || '.');
	
	return forEach(splitted,function(_,className){
		if (className in this.result) {
			this.result = this.result[className];
		} else {
			this.result = null;
			this.skip = true;
		}
	},root);
};