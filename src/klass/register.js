/**
 *	Dependencies
 */
var extend = require('./Functions/extend'),
	forEach = require('./Functions/forEach'),
	prop = require('./Functions/prop'),
	namespace = require('./Functions/namespace');

module.exports = function(handle){
	namespace(handle.getName(),handle.singleton ? new handle() : handle);
};