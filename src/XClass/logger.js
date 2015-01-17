var forEach = require('fn/forEach'),
	extend = require('fn/extend'),
	printf = require('fn/printf'),
	config = require('cls/config');

var exceptionsColor = config.logMessageExceptionColor,
	successColor = config.logMessageSuccessColor,
	userColor = config.logMessageUserColor,
	unknownName = config.logMessageUnknownName,
	anonymousName = config.logMessageAnonymousName,
	searchPattern = config.logMessageSearchPattern,
	tracePattern = config.logMessageTracePattern,
	traceTpl = config.logMessageTraceTpl,
	styleTpl = config.logMessageStyleTpl;

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

	return _printf(traceTpl,{
		name : name,
		link : link
	});
}

function getStyle(color){
	return printf(styleTpl,'hexcode',color || successColor);
}

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

function print(context,args,error,color){
	var color = error ? exceptionsColor : color,
		style = getStyle(color),
		base = context.getCalledMethodBase(),
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

module.exports = function(context,args,error){
	var message = [].concat('[',args,']');

	print(context,message,error,userColor);
};