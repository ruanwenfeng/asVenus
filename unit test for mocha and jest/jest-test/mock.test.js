const callback = require('../example/callback')
const timer = require('../example/timer')

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

  // 让 jest 覆盖全局定时器并重置记录状态
  beforeEach(() => jest.useFakeTimers())

  it('mock timer', () => {
    // 执行待测函数
    const fn = jest.fn()
    timer(fn)

    // 检查 setTimeout 是否被调用了一次
    expect(setTimeout).toHaveBeenCalledTimes(1)
    // 检查 setTimeout 传入的两个参数
    // 是否是一个函数，是否要等待 1s
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)

    // 目前，传入到 timer 中的 fn 回调函数还没被调用
    expect(fn).not.toBeCalled()

    // 那么，我们控制时间流
    // 让定时器马上执行
    jest.runAllTimers()

    //  现在，fn 回调函数执行了！
    expect(fn).toBeCalled();
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

