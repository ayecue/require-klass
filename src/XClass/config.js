module.exports = {
	classPool : {},
	defaultDeepLoggingLevel : false,
	defaultDebugging : true,
	defaultAutoSetterGetter : true,
	setterNameTpl : 'set%:olettersnumber,camelcase:keyword%',
	getterNameTpl : 'get%:olettersnumber,camelcase:keyword%',
	logMessageExceptionColor : '#D8000C',
	logMessageSuccessColor : '#4F8A10',
	logMessageUserColor : '#008B8B',
	logMessageUnknownName : 'unknown',
	logMessageAnonymousName : 'anonymous',
	logMessageSearchPattern : /pLogMessage/i,
	logMessageTracePattern : /at\s(\S+)\s[^\(]*\(([^\)]+)\)/i,
	logMessageTraceTpl : '${%name%} (%link%)',
	logMessageStyleTpl : 'color:%hexcode%;'
};