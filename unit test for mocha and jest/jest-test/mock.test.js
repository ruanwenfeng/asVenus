const callback = require('../example/callback')


describe('mock',  ()  =>{
  it('mock function', () => {
    // 创建一个 mock function
    const fn = jest.fn((a, b) => a + b)
    // 传入测试函数
    callback(fn)

    expect(fn).toHaveBeenCalled()          // 是否被调用
    expect(fn).toHaveBeenCalledTimes(1)    // 是否只调用了一次
    expect(fn).toHaveBeenCalledWith(1, 2)  // 参数值
    expect(fn).toHaveReturnedWith(3)       // 返回值

  })
})