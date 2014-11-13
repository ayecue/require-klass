define(function(require, exports, module) {
    module.exports = [
		'return function(v){',
		'	this.%keyword%=v;',
		'	return this;',
		'};'
	];
});