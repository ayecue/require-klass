/**
 *	Dependencies
 */
var forEach = require('./Functions/forEach'),
	extend = require('./Functions/extend'),
	printf = require('./Functions/printf');

/**
 *	Shortcuts
 */
var exceptionColor = '#D8000C',
	successColor = '#4F8A10',
	userColor = '#008B8B',
	unknownName = 'unknown',
	anonymousName = 'anonymous',
	searchPattern = /pLogMessage/i,
	tracePattern = /at\s(\S+)\s[^\(]*\(([^\)]+)\)/i,
	traceTpl = '${%name%} (%link%)',
	styleTpl = 'color:%hexcode%;';

/**
 *	Trace context location
 */
function analyze(context){
	var info = {};

	Error.captureStackTrace(info);

	var splittedInfo = info.stack.split('\n'),
		indexOfLine = forEach(splittedInfo,function(index,str){
			if (searchPattern.test(str)) {
				this.result = index + 1;
				this.skip = true;
			}
		},-1),
		greppedLine = splittedInfo[indexOfLine];

	if (!greppedLine) {
		return;
	} 

	// 1. link - 2. name
	var matches = greppedLine.match(tracePattern);

	if (!matches) {
		return;
	}

	var	link = matches.pop(),
		name = matches.pop();

	return printf(traceTpl,{
		name : name,
		link : link
	});
}

/**
 *	Get console display style
 */
function getStyle(color){
	return printf(styleTpl,'hexcode',color || successColor);
}

/**
 *	Generating console message templates
 */
function toMessages(args){
	return forEach(args,function(_,item){
		var messages = this.result,
			type = typeof item;

		if (type == 'string') {
			messages.push('%s');
		} else if (type == 'number') {
			messages.push('%d');
		} else if (type == 'boolean') {
			messages.push('%s');
		} else {
			messages.push('%O');
		}
	},[]);
}

/**
 *	Default print function to show context messages
 */
function print(context,args,error,color){
	var color = error ? exceptionsColor : color,
		style = getStyle(color),
		base = context.getCalledMethodKlass(),
		contextName = base ? base.getName() : unknownName,
		methodName = context.getCalledMethodName() || anonymousName,
		messages = toMessages(args);

	if (context) {
		if (context.deepLoggingLevel || methodName == anonymousName) {
			var deepTrace = analyze(context);

			console.groupCollapsed.apply(console,['%c' + contextName + '.' + methodName + messages.join(' '),style].concat(args));
			console.log('%c' + deepTrace,style);
			console.groupEnd();
		} else {
			console.log.apply(console,['%c' + contextName + '.' + methodName + messages.join(' '),style].concat(args));
		}
	} else {
		console.log.apply(console,['%c' + messages.join(' '),style].concat(args));
	}
}

/**
 *	External print function
 */
module.exports = function(context,args,error){
	var message = [].concat('[',args,']');

	print(context,message,error,userColor);
};