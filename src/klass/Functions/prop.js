/**
 *	Dependencies
 */
var forEach = require('./forEach');

/**
 *	Search for path
 */
module.exports = function(path,root,delimiter){
	var splitted = path.split(delimiter || '.');
	
	return forEach(splitted,function(_,className){
		if (className in this.result) {
			this.result = this.result[className];
		} else {
			this.result = null;
			this.skip = true;
		}
	},root || global);
};