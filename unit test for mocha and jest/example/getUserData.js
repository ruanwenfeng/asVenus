
module.exports = function getUserData() {
  return new Promise(resolve => {
    setTimeout(() => resolve('ok'), 2000)
  })
}