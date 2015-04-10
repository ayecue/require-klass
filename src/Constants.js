/*
 * require-klass
 * https://github.com/ayecue/require-klass
 *
 * Copyright (c) 2015 "AyeCue" Sören Wehmeier, contributors
 * Licensed under the MIT license.
 */
'use strict';

exports.ERRORS = {
	KLASS_EVAL: '[require-klass] Compile exception in code: <%= code %> (<%= message %>)',
	EXPOSE_INVALID_PROPERTY: '[require-klass] Property <%= prop %> not found.',
	LOG_INVALID_TYPE: '[require-klass] Type have to be a string.',
	COLLECTION_INVALID_SORT_TYPE: '[require-klass] Invalid sorting type <%= type %>.'
};

exports.MESSAGES = {
	CORE_LOAD_DEPS: '[require-klass] Load dependencies for <%= id %>.',
	CORE_EXTEND_KLASSNAME: '[require-klass] Extend klassName to <%= id %>.',
	CORE_EXTEND_CONFIG: '[require-klass] Extend config to <%= id %>.',
	CORE_EXTEND_MIXINS: '[require-klass] Extend mixins to <%= id %>.',
	CORE_EXTEND_STATICS: '[require-klass] Extend statics to <%= id %>.',
	CORE_EXTEND_PARENT: '[require-klass] Extend parent <%= parentId %> to <%= id %>.',
	CORE_CREATE_SINGLETON: '[require-klass] Create singleton class <%= id %>.',
	BASE_BEFORE_CALL: '[require-klass] Before call of <%= method %> in <%= klassName %>.',
	BASE_AFTER_CALL: '[require-klass] After call of <%= method %> in <%= klassName %>.'
};

exports.KLASS = {
	BASE: 'Base',
	ASSERTLOG: false,
	DEBUGGING: false,
	SINGLETON: false,
	AUTO: true,
	SETTER: 'set<%=:olettersnumber,camelcase:keyword%>',
	GETTER: 'get<%=:olettersnumber,camelcase:keyword%>',
	TEMPLATE: 'return function <%= name %>(){return this.constructor.apply(this, arguments) || null;};'
};

exports.PRIORITY = {
	LOW: 5,
	MIDDLE: 45,
	HIGH: 75
};

exports.LOGGER = {
	EXCEPTION_COLOR: '#D8000C',
	SUCCESS_COLOR: '#4F8A10',
	USER_COLOR: '#008B8B',
	UNKNOWN_NAME: 'unknown',
	ANONYMOUS_NAME: 'anonymous',
	SEARCH_PATTERN: /pLogMessage/i,
	TRACE_PATTERN: /at\s(\S+)\s[^\(]*\(([^\)]+)\)/i,
	TRACE_TPL: '${<%=name%>} (<%=link%>)'
};