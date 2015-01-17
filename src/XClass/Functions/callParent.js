module.exports = function(args,prop){
	var self = this;
		parent = self.getParent(),
		root = parent[prop] || parent,
		name = self.getCalledMethodName();

	if (name in root) {
		root[name].apply(self,args || []);
	}
};