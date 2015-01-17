/**
 *	Dependencies
 */
var forEach = require('fn/forEach');

/**
 *	Search for path
 */
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