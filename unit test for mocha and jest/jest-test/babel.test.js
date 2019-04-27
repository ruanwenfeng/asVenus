import sum from '../example/babel-sum'

describe('第一个测试',  ()  =>{
  it('sum', () => expect(sum(1, 2)).toBe(3))
})