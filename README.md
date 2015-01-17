# require-xclass

Pseudo class system which helps you building big systems fast. Could be compared with the class system of ExtJS.

## API

The global xclass got following methods:

```
/**
 *	Generate class id and returns the string
 */
xclass.id();

/**
 *	Used to loop though objects/arrays
 */
xclass.forEach(object,callback,context);

/**
 *	Convert array like objects to an array
 */
xclass.toArray(arrayLikeObject);

/**
 *	Merge objects
 */
xclass.extend(object1,object2,object3);

/**
 *	Used fill template strings
 */
xclass.printf(templateString,{
	key : value
});

/**
 *	Gets type of object
 */
xclass.typeOf(object);

/**
 *	Override certain values of class
 */
xclass.override(StringOfClass,{
	methodToOverride : function(){
		//blabla
	}
});

/**
 *	Create namespace for class
 */
xclass.namespace(StringOfClass);

/**
 *	Load class
 */
xclass.require(PathToClass);

/**
 *	Trace for class
 */
xclass.getClass(PathToClass);

/**
 *	Create class
 */
xclass.define(NameForClass,ClassConfig);
```

## Example

Here is an example how to use this system:

```
var test = xclass.define('w.test',{
	statics : {
		testing : function(){
			console.log('wad2');
		}
	},
	foo : function(dd){
		this.logMessage('test3',dd);
		return 2;
	},
	moo : function(){
		return 1;
	}
});

var smaller = xclass.define('w.smaller',{
	extends : 'w.test',
	test : 'woot',
	lulu : {
		1 : 2
	},
	mkmk : [5,9,8],
	mixins : {
		something : {
			test : function(){
				console.log(this);
			},
			s : {
				w : function(){
					this.logMessage('run');
				}
			}
		}
	},
	traits : {
		pom : function(){
			this.logMessage('pom');
		}
	},
	statics : {
		testing : function(){
			console.log('wad');
			this.callParent();
		}
	},
	foo : function(){
		this.callParent(['wat']);
		this.logMessage('test',true);
	}
});
```

More Documentation coming...