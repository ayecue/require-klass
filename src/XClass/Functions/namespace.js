/**
 *	Dependencies
 */
var forEach = require('fn/forEach');

/**
 *	Create namespace
 */
module.exports = function(root,id,delimiter){
	var namespaces = id.split(delimiter || '.');

	return forEach(namespaces.slice(0,-1),function(index,value){
		this.result = this.result[value] || (this.result[value] = {});
	},root);
};