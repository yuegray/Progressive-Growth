// call apply bind 介绍和例子

// call和apply是Function 对象的原型方法，它们能够将特定函数当作一个方法绑定到指定对象上并进行调用。
// call, apply 例子：
function add(x, y) {
  return x + y
}
// 使用call来调用add方法
function myAddCall(x, y) {
  return add.call(this, x, y)
}
// 使用apply来调用add方法
function myAddApply(x, y) {
  return add.apply(this, [x, y])
}

console.log(myAddCall(10, 20), 'myAddCall')
console.log(myAddApply(20, 30), 'myApplyCall')

// bind用来把函数绑定到指定对象上
// bind例子：
function checktNumberRange(numberVal) {
  if(typeof numberVal !== 'number') {
    return false
  } else {
    return numberVal >= this.minimum && numberVal <= this.maximum
  }
}
var numberRang = {
  minimum: 10,
  maximum: 40
}
var myAddBind = checktNumberRange.bind(numberRang)
var result = myAddBind(30)
console.log(result, 'myAddBind')




// 手写实现call/apply/bind
// call：
Function.prototype.myCall = function(context) {
  // 判断是否是undefined 和 null 
  if(typeof context === 'undefined' || context === null) {
    context = window
  }
  context.fn = this
  let args = [...arguments].slice(1)
  let result = context.fn(...args)
  delete context.fn 
  return result
}



// apply:
Function.prototype.myApply = function(context) {
  if(typeof context === 'undefined' || context === null) {
    context = window
  }
  context.fn = this
  let args = arguments[1]
  let result
  if(args) {
    result = context.fn(...args)
  } else {
    result = context.fn()
  }
  delete context.fn
  return result
}


// bind: 
Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }
  let _this = this
  let args = [...arguments].slice(1)
  return function F() {
    // 判断是否被当作构造函数使用
    if(this instanceof F) {
      return _this.apply(this, args.concat([...arguments]))
    }
    return _this.apply(context, args.concat([...arguments]))
  }
}