/**
 * promise的核心是状态、状态管理
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
 * 
 */ 



/**
  let p = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 100, 'cat')
  })

  p.then(res => {
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
    cb(this.value)
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

