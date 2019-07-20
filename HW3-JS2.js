Array.prototype.filter = function(fn) {
	let arr = this;	
	let ret = [];
	for (let i = 0; i < arr.length; i++) {
		if (fn(arr[i]))
			ret.push(arr[i]);
	}
	return ret;
}

Array.prototype.map = function(fn) {
	let arr=this;
	let ret = [];
    for (let i = 0; i < arr.length; i++)
        ret.push(fn(arr[i]));
    return ret;
}

Array.prototype.reduce = function(fn) {
	let arr = this;
	let accumulator = arr[0];
	for (let i = 1; i < arr.length; i++) {
		accumulator = fn(accumulator, this[i])
	}
	return accumulator
}
function debounce(fn, wait) {
	let timeout;
	return function () {
		clearTimeout(timeout);
		setTimeout(fn,wait);						// fn, fn(), fn(arguements)?
	}
}
													//if fn has arguments?
													//some questions.
function debouce(fn, wait) {
	let timeout;
	return function() {
		const context = this;						// "this" is decided by how the function is called ？
													// 无论什么时候，JavaScript都会把this放到function内部。
													// 它是基于一种非常简单的思想：如果函数直接是某个对象的成员，
													// 那么this的值就是这个对象。
													// 如果函数不是某个对象的成员那么this的值便设为某种全局对象
													// (常见有，浏览器中的window对象）
		const args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function(){fn.apply(context, args)}, wait);
													// func.apply(thisarg,arguments)

	}												// e.g.
													// var array = ['a', 'b'];
													// var elements = [0, 1, 2];
													// array.push.apply(array, elements);
													// console.info(array); // ["a", "b", 0, 1, 2]

													// the difference between call() and apply():
													// call() accepts an argument list, 
													// while apply() accepts a single array of arguments.
}

function throttle(fn, limit) {
	let timeout;
	return function() {
    	const args = arguments
    	const context = this
    	if (!timeout) {
      		func.apply(context, args)
      		timeout = true
      		setTimeout(function(){timeout = false}, limit);
		}
	}
}

Function.prototype.bind = function(){
	let fn = this；
	let args = arguments
	return function() {
		return fn.apply(this, args);
	};
}

function printTasks(list) {
	func(list, 0);

	function func(input, count) {
		if (count < input.length) {
			setTimeout(function() {
				console.log(input[count].value);
				count++;
				func(input, count);
			},list[count].time);
		}
	}
}

													// while空转会跳出么？
// function printTasks(list) {
// 	let flag = 1；
// 	let i=0;
// 	while(i < list.length){							
// 		if(flag === 1;) {
// 			flag = 0;
// 			setTimeout(t,list[i].value);
// 		}
// 	}
// 	function t() {
// 		console.log(list[i].value));
// 		flag = 1;
// 		i++;
// 	}
// }
