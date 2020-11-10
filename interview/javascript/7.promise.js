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
  阶段三：捕获被动触发的异常，支持then第二个函数执行
    - 如果then第二个函数执行了，catch是不会执行的，除非then第二个错误报错了
    - 在then应该返回一个promise，不管是onFulfilled/onRejected，支持后面的then/catch
    - 如果用户主动return了一个promise，应该用自己的promise等待用户的promise完成且执行自己promise的resolve或者reject
  问题一：如果then里面返回了新的promise，那该怎么处理？
    - 默认我们自己返回一个promise，如果用户手动返回了promise，那就等待，去调用then，轮询拿到resolve/reject
    - 再去调用我们自己本身的promise，执行resolve/reject
    - 达到处理用户的promise，但通过我们自己的promise去响应
    - 具体代码在resolvePromise这个函数中，这个思路甚是巧妙！
  问题二：发现了一个问题..之前测试的代码，都没用异步的方式，比如setTimeout，异步才发现原来代码会有问题，pending中会报错
    - 参考了其他实现，下面重写一般promise，用数组存储callback，在合适的时间遍历执行callback
  案例代码：
    let p = new MyPromise((resolve, reject) => {
      // 模拟抛出错误或者根据情况去reject
      throw Error('wrong')
      reject('wrong: 1')
    })
    p.then(res => {
      return 1234
    }, err => {
      console.log(err)
      console.log('err1')
    }).then(res => {
      console.log(res)
      console.log(err)
    }).catch(err => {
      console.log(err)
    })
  阶段四：由阶段三发现了一系列问题
    1、比如说promise丢了异步代码，直接then/finally会报错等
    2、不能连续then
    3、实际上then里面的代码应该是异步执行的，如下
      var promise = new MyPromise(function (resolve){
        console.log("inner promise"); // 1
        resolve(42);
      });
      promise.then(function(value){
        console.log(value); // 3
      });
      console.log("outer promise"); // 2
      实际上我们写的promise是 inner promise -> 42 -> outer promise
      而真正的promise是 inner promise -> outer promise -> 42
      why: 
        promise小册 chapter2.3
        我们是在then里面去判断status，然后做settimout的，如果已经fulfilled，那then的时候就直接执行了
        应该是在resolve里面去setTimout执行onFulfilled函数
 */

/**
 * 
 * @param {*} promise MyPromise内部返回的新实例
 * @param {*} result then内部返回的值，如果是promise实例
 * @param {*} resolve 新实例的resolve
 * @param {*} reject 新实例的reject
 */
function resolvePromise(promise, result, resolve, reject) {
  if (result instanceof MyPromise) {
    if (result.status === Pending) {
      result.then(newRes => {
        resolvePromise(promise, newRes, resolve, reject)
      }, err => {
        reject(err)
      })
    } else {
      result.then(resolve, reject)
    }
  } else {
    resolve(result)
  }
}

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
    // 捕获代码执行的程序错误
    try {
      callback(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  let promise
  let _this = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (val) => val
  onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err }

  if (this.status === Fulfilled) {
    promise = new MyPromise((resolve, reject) => {
      try {
        let result = onFulfilled(this.value)
        resolvePromise(promise, result, resolve, reject)
      } catch (err) {
        reject(err)
      }
    })
  }
  if (this.status === Rejected) {
    promise = new MyPromise((resolve, reject) => {
      try {
        let result = onRejected(this.reason)
        resolvePromise(promise, result, resolve, reject)
      } catch (err) {
        reject(err)
      }
    })
  }
  if (this.status === Pending) {
    setTimeout(function () {
      _this.then(onFulfilled, onRejected)
    })
  }
  return promise
}

MyPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}

MyPromise.prototype.finally = function(onFinally) {
  if (this.status !== Pending) {
    onFinally && onFinally()
  } else {
    setTimeout(() => {
      this.finally(onFinally)
    })
  }
}

