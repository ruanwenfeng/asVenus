const expect = require('chai').expect
const getUserData = require('../example/getUserData')

describe('异步测试',  ()  =>{
  it('sync', async() => {
    expect(await getUserData()).to.be.equal('ok')
  })



  it('done',  done => {
     getUserData()
       .then(res => {
         expect(res).to.be.equal('ok')
         done()
       })
  })
})