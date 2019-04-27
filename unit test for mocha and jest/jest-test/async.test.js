const getUserData = require('../example/getUserData')
const timer = require('../example/timer')

describe('异步测试',  ()  =>{

  it('promise', () => {
    return getUserData()
      .then(data => {
        expect(data).toBe('ok')
      })
  })

  it('promise2', () => {
    // resolves/rejects 用来告诉 jest
    // 我们要测试成功或失败状态
    return expect(getUserData()).resolves.toBe('ok')
  })


  it('async', async () => {
    expect(await getUserData()).toBe('ok')
  })

  it('done',  done => {
    timer(() => {
      // jest 等待为 5s
      done()
    })
  })
})