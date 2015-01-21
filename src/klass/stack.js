var stack;

function push(method){
	if (stack) {
		stack.$next = method;
		method.$last = stack;
	}
	stack = method;
}

function pop(){
	if (stack.$last) {
		var last = stack;
		stack = stack.$last;
		last.$last = null;
		stack.$next = null;
	}
}

function get(){
	return stack;
}

module.exports = {
	p : push,
	r : pop,
	g : get
};