/*
自定义Promise
*/

(function (window) {

  const PENDING='pending';//代表初始未确定的
  const RESOLVED='resolved';//代表成功的状态
  const REJECTED='rejected';//代表失败的状态

  // promise构造函数
  function Promise(excutor) {

    
    const self=this;//promise的实例对象
   self.status=PENDING;// 状态属性，初始值为pending，代表初始未确定的
    self.data=undefined;//用来存储结果数据的属性，初始值为undefined
    self.callbacks=[];//

    // 改变promise状态改为成功，指定成功的value
    function resolve(value) {
      // 如果当前不是pending，直接结束
    if(self.status!==PENDING) return;

      self.status=RESOLVED;//将状态改为成功
      self.data=value;//保存成功的值

      // 异步调用调用所有缓存的待执行成功的回调函数
      if(self.callbacks.length>0){
        setTimeout(() => {
          self.callbacks.forEach(cbsObj=>{
            cbsObj.onResolved(value);
        })
        })
        
      }

      
    }
    // 改变promise状态为失败，指定失败的原因reason
    function reject(reason) {
      // 如果当前不是pending，直接结束
    if(self.status!==PENDING) return;
      self.status=REJECTED;
      self.data=reason;
      // 异步调用调用所有缓存的待执行失败的回调函数
      if(self.callbacks.length>0){
        setTimeout(() => {
          self.callbacks.forEach(cbsObj=>{
            cbsObj.onRejected(reason);
        })
        });
        
      }

    }

    // 调用excutor来启动异步任务
    try {
      excutor(resolve,reject);
    } catch (error) {//执行器执行出异常，当前promise变为失败
        reject(error);
    }
    

    
  }


  // 用来指定成功和失败的回调函数的方法
  /*
  1.如果当前promise是pending状态，保存回调
  2.如果当前promise是resolved，异步执行成功的回调函数onResolved
  3.如果当前promise是rejected，异步执行失败的回调函数onRejected
  返回一个新的promise对象
  它的结果状态由onResolved或者onRejected执行的结果决定
  1.抛出error==>变为rejected，结果值为error
  2.返回值不是promise   ==> 变为resolved, 结果值为返回值
  3.返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
  
  */



  // 返回一个新的promise对象
 /* Promise.prototype.then=function (onResolved,onRejected) {
  //   保存回调函数
  //  this.callbacks.push({//将两个回调函数以对象的形式保存到promise的
  //     onResolved,
  //     onRejected
  //   })

    const self=this;//promise对象


   
    // 返回一个新的promise对象
    return new Promise((resolve,reject)=>{

      // 调用指定的回调函数callback
      // 根据callback（）执行的结果来更新then（）返回promise的状态
      function handle(callback) {
        try {
          const result=callback(slef.data);
          if (result instanceof Promise) {//返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
            result.then(//取回调函数返回的promise的结果
              value=>resolve(value),
              reason=>reject(reason)
  
            
            )
            // result.then(resolve,reject)
          }else{//返回值不是promise   ==> 变为resolved, 结果值为返回值
            resolved(result);
          }
        } catch (error) {//抛出error==>变为rejected，结果值为error
          reject(error);
        }
      }
  


      //如果当前promise是resolved，异步执行成功的回调函数onResolved
      if(self.status===RESOLVED){
        setTimeout(() => {
          handle(onResolved);
          
        });
        
  //如果当前promise是rejected，异步执行失败的回调函数onRejected
      }else if (self.status===REJECTED) {
        setTimeout(() => {
          handle(onRejected);
          
        });
        //如果当前promise是pending状态，保存回调
      }else{//PENDING
          self.callbacks.push({//不是直接保存成功/失败的回调,保存包含了回调函数调用的函数
            onResolved(value){//在后面调用resolve（）中执行
              handle(onResolved);
            },
            onRejected(reason){
              handle(onRejected);
            }
            
          })
      }

    })

    
  }
*/

/* Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  
  onResolved = typeof onResolved==='function' ? onResolved : value => value // 将value向下传递
  onRejected = typeof onRejected==='function' ? onRejected : reason => {throw reason} // 将reason向下传递

  return new Promise((resolve, reject) => { // 什么时候改变它的状态

    
    // 1. 调用指定的回调函数
    // 2. 根据回调执行结果来更新返回promise的状态
    
    function handle (callback) {
      try {
        const result = callback(self.data)
        if (!(result instanceof Promise)) { //  2.2). 返回值不是promise   ==> 变为resolved, 结果值为返回值
          resolve(result)
        } else { // 2.3). 返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
          result.then(
            value => resolve(value),
            reason => reject(reason)
          )
          // result.then(resolve, reject)
        }
      } catch (error) { // 2.1). 抛出error ==> 变为rejected, 结果值为error
        reject(error)
      }
    }

    if (self.status===RESOLVED) {
      setTimeout(() => {
        handle(onResolved)
      })
    } else if (self.status===REJECTED) {
      setTimeout(() => {
        handle(onRejected)
      })
    } else { // PENDING
      self.callbacks.push({
        onResolved (value) {
          handle(onResolved)
        }, 
        onRejected (reason) {
          handle(onRejected)
        }
      })
    }
  })
}*/



 // 用来指定成功和失败的回调函数的方法
  /*
  1.如果当前promise是pending状态，保存回调
  2.如果当前promise是resolved，异步执行成功的回调函数onResolved
  3.如果当前promise是rejected，异步执行失败的回调函数onRejected
  返回一个新的promise对象
  它的结果状态由onResolved或者onRejected执行的结果决定
  1.抛出error==>变为rejected，结果值为error
  2.返回值不是promise   ==> 变为resolved, 结果值为返回值
  3.返回值是promise    ===> 由这个promise的决定新的promise的结果(成功/失败)
  
  */
Promise.prototype.then=function (onResolved,onRejected) {
  
  const self=this;
  onResolved=typeof onResolved==='function'?onResolved:value=>value;//将value向下传递
  onRejected=typeof onRejected==='function'?onRejected:reason=>{throw reason}//将reason向下传递

  return new Promise((resolve,reject)=>{//什么时候修改状态

    function handle(callback) {
      try {
        const result=callback(self.data);
        if(!(result instanceof Promise)){
             resolve(result);
        }else{
          result.then(
            value=>resolve(value),
            reason=>reject(reason)
          )
         //  result.then(resolve,reject);
        }
       } catch (error) {
         reject(error);
       }
    }

    if(self.status===RESOLVED){
      setTimeout(() => {
        handle(onResolved);
        
      });
    }else if(self.status===REJECTED){
      setTimeout(() => {
        handle(onRejected);
         
      });
    }else{//PENDING
      self.callbacks.push({
        onResolved(value){
          handle(onResolved);
        },
        onRejected(reason){
          handle(onRejected);
        }
      })
    }

  })

  

}

// 用来指定失败的回调函数的方法
  Promise.prototype.catch=function (onRejected) {
    return this.then(undefined,onRejected)
  }


// 返回一个指定value的成功的promise
  Promise.resolve=function (value) {
    return new Promise((resolve,reject)=>{
      if(value instanceof Promise){
        // 如果是一个promise，最终返回的promise的结果由value决定
        value.then(resolve,reject)

      }else{//value不是promise，返回的是成功的promise，成功的值就是value
        resolve(value);
      }
      
    })
  }

  // 返回一个指定reason的成功的promise

  Promise.reject=function (reason) {
    return new Promise((resolve,reject)=>{
      reject(reason);
    })
    
  }


  // 返回一个promise对象，只有当数组中所有promise都成功才成功，否则失败
  Promise.all=function (promise) {

    return new Promise((resolve,reject)=>{
      let resolvedCount=0//已经成功的数量
      const values=[];//用来保存成功promise的值
      // 遍历所有promise取其结果
      promise.forEach((p,index)=>{
        // 返回的promise由第一个p决定其结果
        p.then(
          value=>{
            resolvedCount++
            values[index]=value;
            if(resolvedCount===promise.length){//都成功了
              resolve(values)

            }
          },
          reason=>{reject(reason)}
        )
      })
    })
    
  }




// 返回一个promise，由第一个完成的promise决定
  Promise.race=function (promise) {
    
    return new Promise((resolve,reject)=>{
      // 遍历所有promise取其结果
      promise.forEach(p=>{
        // 返回的promise由第一个p决定其结果
        p.then(resolve,reject )
      })
    })

  }

  // 返回一个延迟指定时间才成功(也可能失败)


  Promise.resolveDelay = function (value, time) {
    return new Promise((resolve,reject)=>{
      setTimeout(() => {
        if(value instanceof Promise){
          // 如果是一个promise，最终返回的promise的结果由value决定
          value.then(resolve,reject)
  
        }else{//value不是promise，返回的是成功的promise，成功的值就是value
          resolve(value);
        }
      }, time);
    })
  }


  // 返回一个延迟指定时间才失败

  Promise.rejectDelay = function (reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason)
      }, time)
    })
  }










  // 向外暴露promise
  window.Promise=Promise;

})(window)