/**
 *	Dependencies
 */
var forEach = require('./forEach');

/**
 *	Create namespace
 */
module.exports = function(id,value,root,delimiter){
	var namespaces = id.split(delimiter || '.'),
		last = namespaces.pop();

	return forEach(namespaces,function(index,value){
		this.result = this.result[value] || (this.result[value] = {});
	},root || global)[last] = value || {};
};