/**
 *	Dependencies
 */
var printf = require('./printf'),
	errors = require('../errors');

/**
 *	Call parent of class
 */
module.exports = function(args,prop){
	var self = this,
		klass = self.getCalledMethodKlass(),
		parent = klass.getParent();

	if (!parent) return;

	var root = parent[prop] || parent,
		name = self.getCalledMethodName();

	if (name in root) return root[name].apply(self,args || []);
	throw new Error(printf(errors.noParentMethod,'name',name));
};