/**
 *	Dependencies
 */
var extend = require('fn/extend'),
	forEach = require('fn/forEach'),
	config = require('cls/config'),
	manager = require('cls/manager')

/**
 *	Shortcuts
 */
var xclass = manager.xclass;

/**
 *	Keyword operations
 */
var opts = {
		/**
		 *	Extend default keyword
		 */
		'set' : function(keyword,value){
			this[keyword] = value;
		}
	},
	/**
	 *	Possible internal keywords on class with link to keyword operation 
	 */
	internals = {
		'singleton' : opts.set,
		'debug' : opts.set,
		'autoSetterGetter' : opts.set
	};

/**
 *	Extend keywords to class
 */
function Settings(handle,properties) {
	var getSettingsOpts = config.getSettingsOpts;

	if (getSettingsOpts) {
		extend(internals,getSettingsOpts.call(internals,opts));
	}

	forEach(internals,function(keyword,internal){
		if (keyword in properties) {
			internal.call(handle,keyword,properties[keyword]);

			properties[keyword] = null;
			delete properties[keyword];
		}
	});
};

module.exports = Settings;