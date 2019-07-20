//1.

Array.prototype.filter = function(fn) {
	let arr = this;	
	let ret = [];
	for (let i = 0; i < arr.length; i++) {
		if (fn(arr[i]))
			ret.push(arr[i]);
	}
	return ret;
}；



//2.

Array.prototype.map = function(fn) {
	let arr=this;
	let ret = [];
    for (let i = 0; i < arr.length; i++)
        ret.push(fn(arr[i]));
    return ret;
}；



//3.

													//Chao‘s: 
													//function(fn,start) 
													//	for(let item of this) 
													//		start = fn(fn, item)
													//	return start
Array.prototype.reduce = function(fn) {				
	let arr = this;
	let accumulator = arr[0];
	for (let i = 1; i < arr.length; i++) {
		accumulator = fn(accumulator, this[i])
	}
	return accumulator
}



//4.

// function debounce(fn, wait) {					//还需考虑arguements，fn？fn()? fn(arguements)?
// 	let timeout;
// 	return function () {
// 		clearTimeout(timeout);						
// 		setTimeout(fn,wait);						
// 	}
// }

//Chao‘s
Function debouce(fn, wait) {
	let _timer;
	return function(...args) { 
		clearTimeout(_timer);
		_timer = setTimeout(() => {
			fn.apply(null, args);					//为什么不是this？
			}, wait)
	}
}

function debouce(fn, wait) {
	let timeout;
	return function() {
		const context = this;
		const args = arguments;
													// "this" is decided by how the function is called ？
													// 无论什么时候，JavaScript都会把this放到function内部。
													// 它是基于一种非常简单的思想：如果函数直接是某个对象的成员，
													// 那么this的值就是这个对象。
													// 如果函数不是某个对象的成员那么this的值便设为某种全局对象
													// (常见有，浏览器中的window对象）
		clearTimeout(timeout);
		timeout = setTimeout(function(){fn.apply(context, args)}, wait);
	}												
}
													// func.apply(thisarg,arguments)
													// e.g.
													// var array = ['a', 'b'];
													// var elements = [0, 1, 2];
													// array.push.apply(array, elements);
													// console.info(array); // ["a", "b", 0, 1, 2]
													// the difference between call() and apply():
													// call() accepts an argument list, 
													// while apply() accepts a single array of arguments.



//5.***

//Chao's
const throttle = function(fn, limit) {
	let tr;
	return function() {
		const args = arguments 
		if(! tr) {
			fn.apply(this, args) tr = true;			//this & arguments
			setTimeOut(() => tr = false, limit)
		}
	} 
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



//6.*******

//e.g.
let module = {
  x: 42,
  getX: function() {
    return this.x;
  }
}
var unboundGetX = module.getX; //undefined
var boundGetX = unboundGetX.bind(module); //42

//e.g.
function list() {
  return Array.prototype.slice.call(arguments);
}
function addArguments(arg1, arg2) {
    return arg1 + arg2
}
var list1 = list(1, 2, 3); // [1, 2, 3]
var result1 = addArguments(1, 2); // 3
// Create a function with a preset leading argument
var leadingThirtysevenList = list.bind(null, 37);
// Create a function with a preset first argument.
var addThirtySeven = addArguments.bind(null, 37); 
var list2 = leadingThirtysevenList(); 
// [37]
var list3 = leadingThirtysevenList(1, 2, 3); 
// [37, 1, 2, 3]
var result2 = addThirtySeven(5); 
// 37 + 5 = 42 
var result3 = addThirtySeven(5, 10);
// 37 + 5 = 42 , second argument is ignored

//e.g.
function LateBloomer() {
  this.petalCount = Math.floor(Math.random() * 12) + 1;
}
// Declare bloom after a delay of 1 second
LateBloomer.prototype.bloom = function() {
  window.setTimeout(this.declare.bind(this), 1000);
};
LateBloomer.prototype.declare = function() {
  console.log('I am a beautiful flower with ' +
    this.petalCount + ' petals!');
};
var flower = new LateBloomer();
flower.bloom();  
// after 1 second, triggers the 'declare' method

//Chao's
Function.prototype.bind = (...args) => {
	let func = this;
	let context = args.shift();						//去掉并返还首项，所以context是首项
	let previousArgs = args;						//此args是去首后的
	return (...args) => {
		let finalArgs = [...previousArgs, ...args];
		return func.apply(context, finalArgs);
	}
}

Function.prototype.bind = function(){
	let fn = this；
	let args = arguments
	return function() {
		return fn.apply(this, args);
	};
}

//7.
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
//
// 	function t() {
// 		console.log(list[i].value));
// 		flag = 1;
// 		i++;
// 	}
// }
