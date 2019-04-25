// 引入 chai 断言库
const expect = require('chai').expect
// 引入待测试的函数
const sum = require('../example/sum')

// describe 相当于一个测试的组，把一类相同的测试用例放在一起
// 第一个参数是对测试组的说明
// 第二个参数仅是一个普通的回调，我们在里面放置一个或多个测试用例
describe('第一个测试',  ()  =>{
  // it 就是一个测试用例
  it('sum', () => expect(sum(1, 2)).to.be.equal(3))
  // expect 接受一个 Actual，一个结果值
  // to.be 是 chai 的提高可读性的语言链（可有可无）
  // equal 是一个断言函数，接受一个 Expected，一个期待值
  // 当 Actual 通过 equal 断言相等 Expected 时，测试通过
  // 反之，失败
})