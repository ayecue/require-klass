# require-xclass

Pseudo class system which helps you building big systems fast. Could be compared with the class system of ExtJS.


## Overview

The global xclass got following methods:

* <a href="#xclassid">xclass.id()</a> - Generate class id and returns the string
* <a href="#xclassforeach">xclass.forEach(object,callback,context)</a> - Used to loop though objects/arrays
* <a href="#xclasstoarray">xclass.toArray(arrayLikeObject)</a> - Convert array like objects to an array
* <a href="#xclassextend">xclass.extend(object1,object2,object3)</a> - Merge objects
* <a href="#xclassprintf">xclass.printf(templateString,key,value)</a> - Used fill template strings
* <a href="#xclasstypeof">xclass.typeOf(object)</a> - Gets type of object
* <a href="#xclassoverride">xclass.override(StringOfClass,classObject)</a> - Override certain values of class
* <a href="#xclassnamespace">xclass.namespace(StringOfClass)</a> - Create namespace for class
* <a href="#xclassrequire">xclass.require(ArrayWithLibraries,CallbackAfterLoading)</a> - Load class
* <a href="#xclassget">xclass.get(PathToClass)</a> - Trace for class
* <a href="#xclassdefine">xclass.define(NameForClass,ClassConfig)</a> - Create class


## xclass.id

This is a pretty easy function it's just generating ids. You can use for example for class names.

Example usage: 
```
var name = xclass.id(); //returns something like class#rthrh435345Kesfs
```


## xclass.forEach

Basicly this a method to loop through objects. But it got one nice feature. You can use a context object which got two properties 'result' and 'skip'.

Example usage: 
```
var removedUnderscoreArray = xclass.forEach(['_w','_t','_m'],function(index,value){
	this.result.push(value.replace('_',''));
},[]);

console.log(removedUnderscoreArray.join(','));
```


## xclass.toArray

Simple method to convert 'array-like-objects' to arrays.

Example usage: 
```
function getFirstArg(){
	var args = xclass.toArray(arguments);

	return args.shift();	
};
```


## xclass.extend

Simple extend method to merge multiple objects together.

Example usage: 
```
var objectFusion = extend({
	foo : 0x01
},{
	bar : 0x02
});

objectFusion.foo;
objectFusion.bar;
```


## xclass.printf

Could be compared to the php function printf. Fill string templates with values. Also this method got some nice formating functions.

Following formating codes are possible:

* camelcase - Upper first letter
* capitalise - Upper first letter, lower all other letters
* upper - Upper all
* lower - Lower all
* ouletters - Remove everything except upper letters
* olletters - Remove everything except lower letters
* onumber - Remove everything except numbers
* olettersnumber - Remove everything except letters and numbers
* oword - Just allow normal chars
* ruletters - Remove all upper letters
* rlletters - Remove all lower letters
* rnumber - Remove all numbers
* rword - Remove all word chars
* rdot - Remove all dots
* trim - Remove whitespaces left/right
* triml - Remove whitespaces left
* trimr - Remove whitespaces right

Example usage: 
```
//simple single
xclass.printf('%name% has a problem with WAYNE','name','Joe');

//simple multiple
xclass.printf('%name% has a problem with %troublemaker%',{
	name : 'Joe',
	troublemaker : 'WAYNE'
});

//advanced multiple
xclass.printf('%:capitalise,trim:name% has a problem with %:upper:troublemaker%',{
	name : 'joe',
	troublemaker : 'wayne'
});
```


## xclass.typeOf

Get type of object.

Example usage: 
```
xclass.typeOf(0); //number
xclass.typeOf([]); //array
xclass.typeOf({}); //object
```


## xclass.override

Override certain class. Just as you would define a new class but overriding an already existing class.

Example usage: 
```
xclass.override('w.smaller',{
	statics : {
		myFunc : function(){
			return 2;
		}
	},
	lulu : {
		5 : 6
	},
	foo : function(){
		this.callParent(['foo']);
		this.logMessage('wassup',true);
	}
});
```


## xclass.namespace

Create a namespace for your class.

Example usage: 
```
xclass.namespace('w.a.s');

xclass.w.a; //would be an empty object
//so now you can do this
xclass.w.a.s = 'test';
```


## xclass.require

With this method you define all needed classes to start your script.

Example usage: 
```
xclass.require([
	'w.test',
	'w.smaller',
	'w.run'
],function(test,smaller,run){
	//your code here
});
```


## xclass.get

With this method you get a class out of the xclass context.

Example usage: 
```
xclass.get('w.smaller'); //returns class (if available)
```


## xclass.define

This method is there to create your classes. It's the basic xclass constructor.

Following properties are there to conifgurate your xclass:

* extends - Library you want to extend
* requires - Libraries you need in your class
* mixins - Mixins you want to use in your class
* traits - Modules which should get extended to your class
* statics - Static properties which you want to extend to your base

Following defauts statics are extended to your xclass:

* singleton - Define if your class is a singleton
* debug - Define if the class is in debug mode
* autoSetterGetter - Define if automaticly setter/getter get created
* getClass() - Get base class/Get constructor
* getMixins() - Get mixins of this class
* getCalledMethod() - Get current called method (just working inside class functions)
* getCalledMethodBase() - Get current called method class (just working inside class functions)
* getCalledMethodName() - Get current called method name (just working inside class functions)
* getCalledMethodFunction() - Get current called method function (just working inside class functions)
* getParent() - Get extending parent
* callParent(arguments) - Call parent method if there's one (just working inside class functions)
* isDebug() - Getter for debug property
* getName() - Get name of class
* logMessage(arguments,isError) - Print message in console in context of class (just working properly inside class functions)
* applyTo(class) - Extend this class to another class

Following defauts statics are extended to your xclass:

* isPrototypeObject - Define if this object is an prototype object
* getDefaultValues() - Get default values which should be extended on every new created instance
* getClass() - Get base/constructor of instance
* getCalledMethod() - Get current called method (just working inside class functions)
* getCalledMethodBase() - Get current called method class (just working inside class functions)
* getCalledMethodName() - Get current called method name (just working inside class functions)
* getCalledMethodFunction() - Get current called method function (just working inside class functions)
* callParent(arguments) - Call parent method if there's one (just working inside class functions)
* getParent() - Get extending parent
* getName() - Get name of class
* extend(object1,object2,object3) - Extend properties to current instance
* logMessage(arguments,isError) - Print message in console in context of class (just working properly inside class functions)
* isDebug() - Getter for debug property
* callMixin(MixinName,MixinProperty,arguments) - Call a mixin in context of this class 

Example usage: 
```
var smaller = xclass.define('w.smaller',{
	extends : 'w.test',
	test : 'woot',
	lulu : {
		1 : 2
	},
	mkmk : [5,9,8],
	requires : [
		'w.run'
	],
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
		statics : {
			myFunc : function(){
				return 0;
			}
		},
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