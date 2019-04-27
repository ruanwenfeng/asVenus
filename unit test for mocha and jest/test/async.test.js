const expect = require('chai').expect
const getUserData = require('../example/getUserData')
const timer = require('../example/timer')

describe('异步测试',  ()  =>{

  it('promise', () => {
    return getUserData()
      .then(data => {
        expect(data).to.be.equal('ok')
      })
  })

  it('sync', async() => {
    expect(await getUserData()).to.be.equal('ok')
  })


  it('done',  done => {
    timer(() => {
      // 告诉 mocha 测试已经结束了！
      // 注意，mocha 只会等待 2s
      // 超时后，自动判断为测试失败
      done()
    })
  })
})