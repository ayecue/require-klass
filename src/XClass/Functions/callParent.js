/**
 *	Dependencies
 */
var printf = require('fn/printf'),
	config = require('cls/config');

/**
 *	Shortcuts
 */
var errorNoParent = config.errorNoParent,
	errorNoParentMethod = config.errorNoParentMethod;

/**
 *	Call parent of class
 */
module.exports = function(args,prop){
	var self = this,
		parent = self.getParent();

	if (parent === null) {
		throw new Error(errorNoParent);
	}

	var root = parent[prop] || parent,
		name = self.getCalledMethodName();

	if (name in root) {
		return root[name].apply(self,args || []);
	}

	throw new Error(printf(errorNoParentMethod,'name',name));
};