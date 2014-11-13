define(function(require, exports, module) {
    module.exports = [
		'return function %id%(%params%){',
		'	%code%',
		'	return !!this.create ? (this.create.apply(this,arguments) || this) : this;',
		'};'
	];
});