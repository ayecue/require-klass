/**
 *	Dependencies
 */
var forEach = require('fn/forEach'),
	load = require('fn/load'),
	manager = require('cls/manager');

module.exports = function(libraries,fn){
	if (!(libraries instanceof Array)) {
		libraries = [scripts];
	}

	var index = 0,
		max = libraries.length,
		result = [],
		addArgs = true,
		queue = function(){
			if (index == max) {
				addArgs = false;
				max = forEach(manager.pending,function(id){
					this.result.push(id);
				},libraries).length;

				if (index == max) {
					return fn.apply(null,result);
				}
			}

			load(libraries[index++],function(handle){
				if (addArgs) {
					result.push(handle);
				}

				queue();
			});
		};

	queue();
};