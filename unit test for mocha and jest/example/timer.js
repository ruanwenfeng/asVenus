
// 模拟一个获取用户数据的接口调用
module.exports = function getUserData() {
  return new Promise(resolve => {
    // 二秒后异步成功，返回一个 'ok'
    setTimeout(() => resolve('ok'), 1000)
  })
}