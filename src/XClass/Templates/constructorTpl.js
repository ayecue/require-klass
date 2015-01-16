module.exports = [
	'return function %id%(%params%){',
	'	%code%',
	'	this._init();',
	'	return !!this.create ? (this.create.apply(this,arguments) || this) : this;',
	'};'
].join('');