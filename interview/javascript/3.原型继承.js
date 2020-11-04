// 继承一 【类式继承】
//  1、通过实例化父类挂载到原型链
//  2、覆盖子类的原型方法
// 缺点
//  1、实例对父类的原型都是引用状态，改一个全都变了
//  2、实现继承的时候直接实例化，不能在子类构造中传递函数

// function SuperClass() {
//   this.superValue = 123
// }

// SuperClass.prototype.saySuperValue = function() {
//   console.log(this.superValue)
// }

// function SubClass(val) {
//   this.subValue = val
// }

// SubClass.prototype = new SuperClass()
// SubClass.prototype.sayValue = function() {
//   console.log(this.subValue)
//   this.saySuperValue()
// }


// 继承二 【构造函数继承】
//  1、在构造函数中，通过this的绑定，执行父类构造函数，绑定到实例上
// 缺点
//  1、没有绑定上父类的原型
// function SuperClass() {
//   this.superValue = 123
// }

// SuperClass.prototype.saySuperValue = function() {
//   console.log(this.superValue)
// }

// function SubClass(val) {
//   this.subValue = val
//   SuperClass.call(this, ...arguments)
// }

// SubClass.prototype.sayValue = function() {
//   console.log(this.subValue)
//   this.saySuperValue()
// }

// 继承三【组合式继承】
//  1、结合继承1，挂载父类的原型
// 缺点
//  1、父类执行了两次
// function SuperClass() {
//   this.superValue = 123
// }

// SuperClass.prototype.saySuperValue = function() {
//   console.log(this.superValue)
// }

// function SubClass(val) {
//   this.subValue = val
//   SuperClass.call(this, ...arguments)
// }

// // 挂载父类的构造函数
// SubClass.prototype = new SuperClass();
// SubClass.prototype.sayValue = function() {
//   console.log(this.subValue)
//   this.saySuperValue()
// }

// 继承四、寄生组合式继承
function SuperClass() {
  this.superValue = 123
}

SuperClass.prototype.saySuperValue = function() {
  console.log(this.superValue)
}

function SubClass(val) {
  this.subValue = val
  SuperClass.call(this, ...arguments)
}

SubClass.prototype = SuperClass.prototype
SubClass.prototype.constructor = SubClass
SubClass.prototype.sayValue = function() {
  console.log(this.subValue)
  this.saySuperValue()
}
