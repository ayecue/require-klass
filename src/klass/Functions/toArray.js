/**
 * 	Convert array like object to array
 */
module.exports = 'slice' in Array.prototype ? function(n){
	return Array.prototype.slice.call(n,0);
} : function(n){
	var t = [];
	Array.push.apply(t,n);
	return t;
};