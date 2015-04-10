/*
 * require-klass
 * https://github.com/ayecue/require-klass
 *
 * Copyright (c) 2015 "AyeCue" Sören Wehmeier, contributors
 * Licensed under the MIT license.
 */
'use strict';

module.exports = (function(
	extend,
	forEach,
	printf,
	from,
	decapitalize,
	indexOf,
	emptyFn,
	Argmap,
	Assert,
	Collection,
	CONSTANTS,
	req
){
	function Loader(options){
		extend(this,{
			manager: null,

			cache: new Collection({
				searchProperty: 'filepath',
				getProperty: 'url'
			}),
			enableCache: true,

			parseCache: new Collection({
				searchProperty: 'name',
				getProperty: 'filepath'
			}),
			enableParseCache: true
		},options);
	}

	extend(Loader.prototype,{
		self: Loader,

		parse: function(name){
			var me = this,
				filepath = me.enableParseCache && me.parseCache.get(name),
				parts, file;

			if (filepath) {
				return filepath;
			}

			parts = name.split('.');

			file = parts.pop();

			filepath = forEach(parts,function(_,name){
	            this.result.push(decapitalize(name));
	        },[]);
		    filepath.push(file);
		    filepath = filepath.join('/');

		    if (me.enableParseCache) {
				me.parseCache.push({
					name: name,
					filepath: filepath
				});
		    }

			return filepath;
		},

		resolve: function(name){
		    var me = this,
		    	filepath = me.parse(name),
		    	url = me.enableCache && me.cache.get(filepath);

		    if (url) {
				return url;
			}

			filepath = filepath + '.js';
			url = req.toUrl(filepath);

			if (me.enableCache) {
				me.cache.push({
					filepath: filepath,
					url: url
				});
			}

			return url;
		},

		require: function(deps,done){
			var me = this,
				fire = function(name){
					var dep = me.manager.getKlass(name) || me.manager.get(name);

					missing.remove(name);
					argMap.set(name,dep);

					if (missing.isEmpty()) {
						done.apply(me,argMap.collect());
					}
				},
				argMap, missing, range;

			if (typeof deps === 'string') {
				deps = from(deps);
			}

			argMap = new Argmap({
				includeArgs: deps
			});

			if (deps.length > 0) {
				missing = forEach(deps,function(_,name){
					var dep = me.manager.getKlass(name) || me.manager.get(name);

					if (!dep) {
						this.result.push({
							name: name
						});
					} else {
						argMap.set(name,dep);
					}
				},new Collection({
					searchProperty: 'name',
					getProperty: 'name'
				}));

				if (!missing.isEmpty()) {
					me.manager.addListener(fire,missing.getAll());

					range = missing.range();
					range = forEach(range,function(_,item){
						var url = me.resolve(item.name);

						this.result.push(url);
					},[]);

					req(range,emptyFn);

					return;
				}
			}

			done.apply(me,argMap.collect());
		}
	});

	return Loader;
})(
	require('./common/extend'),
	require('./common/forEach'),
	require('./common/printf'),
	require('./common/from'),
	require('./common/decapitalize'),
	require('./common/indexOf'),
	require('./common/emptyFn'),
	require('./Argmap'),
	require('./Assert'),
	require('./Collection'),
	require('./Constants'),
	global.require
);