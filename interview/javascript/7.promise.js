/**
 * promise的核心是状态、状态管理
 * 阶段一：实现初步then，能够正常执行异步任务
 * 案例代码：
 *  let p = new MyPromise((resolve, reject) => {
      setTimeout(resolve, 100, 'cat')
    })
    p.then(res => {
      console.log(res)
    })

 * 问题一：then语法上是同步的，但存在异步任务，如何在异步完成后才能处理then中的函数呢 
 *  let p = new MyPromise((resolve, reject) => {
      setTimeout(resolve, 100, 'cat')
    })
    p.then(res => {
      console.log(res)
    })
    MyPromise.prototype.then = function(cb) {
      if (this.status === Fulfilled) {
        cb(this.value)
      }
    }
    这里resolve的时候，是在100之后的timeout，但then已经执行了
  解决：使用setTimeout发起一个宏任务——在当前宏任务执行完毕后再去看（异步）任务是否完成，执行回调
    🤔️ 如果有太多的promise，会不会有一堆的宏任务需要处理
    MyPromise.prototype.then = function(cb) {
      let _this = this
      if (this.status === Fulfilled) {
        cb(this.value)
      } else {
        setTimeout(function () {
          _this.then(cb)
        })
      }
    }
 * 阶段二：实现then的链式调用，能够正常执行异步任务
      - 如果then里面本身返回了promise，返回该promise
      - 如果then里面没有返回promise，自动封装返回一个新的promise
        - 将return指作为新promise的value值，并完成resolve
   问题一：链式调用稍微有点绕不过来，支持链式调用的前提是返回的对象有这个方法，所以我们在then里面返回了新建的promise实例
 * 案例代码：
    let p = new MyPromise((resolve, reject) => {
      resolve(1)
    })
    p.then(res => {
     // 默认返回一个promise
      console.log(res)
      return 2
    }).then(res => {
      console.log(res)
     // 这里要支持能够继续then下去
     return new MyPromise(resolve => {
      resolve(3)
     })
    }).then(res => {
      console.log(res)
    })
  * 
 */

const Fulfilled = 'FulFilled'
const Rejected = 'Rejected'
const Pending = 'Pending'

function MyPromise(callback) {
  this.value = null
  this.reason = null
  this.status = Pending

  let resolve = (result) => {
    if (this.status === Pending) {
      this.value = result
      this.status = Fulfilled
    }
  }

  let reject = (reason) => {
    if (this.status === Pending) {
      this.reason = reason
      this.status = Rejected
    }
  }

  if (callback && typeof callback === 'function') {
    callback(resolve, reject)
  }
}


MyPromise.prototype.then = function(cb) {
  let _this = this
  if (this.status === Fulfilled) {
    let p2 = cb(this.value)
    if (p2 && p2 instanceof MyPromise) return p2
    let p3 = new MyPromise(resolve => {
      resolve(p2)
    })
    return p3
  } else {
    setTimeout(function () {
      _this.then(cb)
    })
  }
}

MyPromise.prototype.catch = function(cb) {
  if (this.status === Rejected) {
    cb(this.reason)
  }
}

