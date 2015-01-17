/**
 * 	Get type of object
 */
module.exports = function(x){
    var c = x.constructor;
    
    return (c.name || (/function ([^\(]+)/i.exec(c.toString()) && (c.name = RegExp.$1))).toLowerCase();
};