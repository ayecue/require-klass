var forEach = require('./forEach'),
	extend = require('./extend'),
	printf = require('./printf'),
	config = require('./config');

function Logger(){
	extend(this,{
		exceptionsColor : config.logMessageExceptionColor,
		successColor : config.logMessageSuccessColor,
		userColor : config.logMessageUserColor,
		unknownName : config.logMessageUnknownName,
		anonymousName : config.logMessageAnonymousName,
		searchPattern : config.logMessageSearchPattern,
		tracePattern : config.logMessageTracePattern,
		traceTpl : config.logMessageTraceTpl,
		styleTpl : config.logMessageStyleTpl
	});
}

extend(Logger.prototype,{
	analyze : function(context){
		var self = this,
			info = {};

		Error.captureStackTrace(info);

		var splittedInfo = info.stack.split('\n'),
			indexOfLine = forEach(splittedInfo,function(index,str){
				if (self.searchPattern.test(str)) {
					this.result = index + 1;
					this.skip = true;
				}
			},-1),
			greppedLine = splittedInfo[indexOfLine];

		if (!greppedLine) {
			return;
		} 

		// 1. link - 2. name
		var matches = greppedLine.match(self.tracePattern);

		if (!matches) {
			return;
		}

		var	link = matches.pop(),
			name = matches.pop();

		return _printf(self.traceTpl,{
			name : name,
			link : link
		});
	},
	getStyle : function(color){
		var self = this;

		return printf(self.styleTpl,'hexcode',color || self.successColor);
	},
	toMessages : function(args){
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
	},
	print : function(context,args,error){
		var self = this,
			message = [].concat('[',args,']');

		self.printEx(context,message,error,self.userColor);
	},
	printEx : function(context,args,error,color){
		var self = this,
			color = error ? self.exceptionsColor : color,
			style = self.getStyle(color),
			contextName = context.getCalledMethodBase().getName() || self.unknownName,
			methodName = context.getCalledMethodName() || self.anonymousName,
			messages = self.toMessages(args);

		if (context) {
			if (context.deepLoggingLevel || methodName == self.anonymousName) {
				var deepTrace = self.analyze(context);

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
});

module.exports = new Logger();