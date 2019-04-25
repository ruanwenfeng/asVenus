// 引入待测试的函数
const sum = require('../example/sum')


describe('第一个测试',  ()  =>{
  // jest 自带断言库
  it('sum', () => expect(sum(1, 2)).toBe(3))
})