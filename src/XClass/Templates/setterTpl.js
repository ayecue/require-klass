module.exports = [
	'return function(v){',
	'	this.%keyword%=v;',
	'	return this;',
	'};'
].join('');