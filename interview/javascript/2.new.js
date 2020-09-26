function myNew(func, ...args) {
  const instance = {}
  if (func.prototype) {
    Object.setPrototypeOf(instance, func.prototype)
  }
  const res = func.apply(instance, args)
  if (typeof res === 'function' || (typeof res === 'object' && res !== null)) {
    return res
  }
  return instance
}

function Person(name) {
  this.name = name
}
Person.prototype.sayName = function() {
  console.log(this.name)
}

// const me = new Person('new')
// const my = myNew(Person, 'myNew')
// me.sayName()
// my.sayName()
// console.log(me)
// console.log(my)