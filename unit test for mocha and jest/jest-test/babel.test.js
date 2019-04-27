import sum from '../example/babel-sum'
import { expect } from 'chai'

describe('第一个测试',  ()  =>{
  it('sum', () => expect(sum(1, 2)).to.be.equal(3))
})