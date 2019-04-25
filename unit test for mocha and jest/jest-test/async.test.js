const getUserData = require('../example/getUserData')

describe('异步测试',  ()  =>{

  it('async', async () => {
    expect(await getUserData()).toBe('ok')
  })

  it('done',  done => {
     getUserData()
       .then(data => {
         expect(data).toBe('ok')
         done()
       })
  })

  it('promise', () => {
    return expect(getUserData()).resolves.toBe('ok')
  })
})