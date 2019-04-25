
# 单元测试是什么？

我本来打算先一条一条列出测试给我们的**前端**项目带来的“先民血统”（保证项目的质量）和“劳动力解放”（自动化的力量）等诸多良好特性。但转念一想，您既然来了肯定是知道测试的种种好处，至少您也肯定知道 100% 覆盖率的测试真是亮瞎眼的装逼利器。

你认为测试难吗？

我觉得一点都不难，反而觉得到处在复制和黏贴测试代码。这可不是代码缺少复用性，我只是懒和**测试根本没什么套路可言**。这句话，并不是说写测试像读网文小说一样没内涵，而是力求**简洁直白**。

如果你听过 TDD（测试驱动开发），对单元测试一定不会陌生，它是来对一个模块、类或函数进行断言返回值的结果是否和符合预期的结果。既然称为单元，也就是意味着我们要进入一个个函数体，检查每行代码的执行情况，是一种精细的测试。

看到本教程的题目，您可能已经听说过 mocha 和 jest 的大名，也许您已经使用 mocha 写过一些测试。我之所以把长得跟一个妈生的两兄弟放在一起，就是因为他们实在太像了，既然要学，为什么我们不能一次掌握两个目前（前端）最火的单元测试框架呢。答案是，可以的。

那么，我们开始吧！

# 第一个测试

首先，通过 npm 安装单元测试框架 mocha 和 jest 与 [chai 断言库](https://www.chaijs.com/api/assert/)。

```bash
$ cnpm i mocha chai jest -D
```

我们编写一个待测试的 `sum` 函数，它非常简单。

```js
// example/sum.js

module.exports = function sum (a, b) {
  return a + b
}
```

然后，在 `test` 目录下编写我们的第一个测试。

```js
// test/sum.test.js

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
```

现在，就是现在，打开您的命令行，轻轻地敲下 `mocha` 这个单词，回车，mocha 会自动寻找到 test 文件并执行测试，你会看到。

![image](5BB2B846883849E5B5296C0A67EC9F34)

是吧，我们测试通过了，

现在我们在 `jest-test` 目录下编写 **jest** 的测试。

```js
// jest-test/sum.test.js

const sum = require('../example/sum')

describe('第一个测试',  ()  => {
  // jest 自带断言库
  it('sum', () => expect(sum(1, 2)).toBe(3))
})
```

然后我们在命令行敲下 `jest jest-test`，如果未发生意外你会看到。

![image](E9B8F4CE3CAD44CD87A6CFD754D98FF3)


> 如果你看到命令行抛出以下报错：  
> `Cannot find module 'source-map-support' from 'source-map-support.js'`   
> 你还需要执行 `npm i source-map-support -D` 安装 jest 的依赖。然后再次执行即可。

那么，现在你应该能理解单元测试的本质了吧，就是断言，**就是输入一个值然后根据一个断言的规则最后看是否符合期待值。**



# 异步测试

前端业务中的异步场景多如牛毛，比如最常见的接口调用。那么，我们在本地通过 `promise` 模拟一个获取用户数据的接口。

```js
// example/getUserData.js

module.exports = function getUserData() {
  return new Promise(resolve => {
    // 两秒后异步成功，返回一个 'ok'
    setTimeout(() => resolve('ok'), 1000)
  })
}
```

我们先看 async/await 的异步测试，因为它最简单也是唯一推荐的方式。

```js
// mocha ☞ test/async.test.js

describe('异步测试',  () => {

  it('sync', async () => {
    expect(await getUserData()).to.be.equal('ok')
  })
})
```



```js
// jest ☞ jest-test/async.test.js

describe('异步测试',  ()  => {

  it('async', async () => {
    expect(await getUserData()).toBe('ok')
  })
})
```

然后再看，使用done 函数手动结束测试。

```js
// mocha ☞ test/async.test.js

describe('异步测试',  () => {

  it('done',  done => {
     getUserData()
       .then(res => {
         expect(res).to.be.equal('ok')
         // 告诉 mocha 测试已经结束了！
         // 注意，mocha 只会等待 2s
         // 超时后，自动判断为测试失败
         // 我们会在配置一小节中讲到怎么延长它
         done()
       })
  })
})
```



```js
// jest ☞ jest-test/async.test.js

describe('异步测试',  ()  => {

  it('done',  done => {
     getUserData()
       .then(data => {
         expect(data).toBe('ok')
         done()
       })
  })
})
```

另外，jest 还可以直接把 promise 返回，然后通过 `resolves/rejects` 标识告诉 jest 我们要测试一个 promise 的成功或失败状态。

```js
// jest ☞ jest-test/async.test.js

describe('异步测试',  ()  => {

  it('promise', () => {
    return expect(getUserData()).resolves.toBe('ok')
  })
})
```

# 钩子

mocha 和 jest 拥有相同的钩子机制，就连钩子的名字也相同。

```js
// 所有测试执行前触发，只触发一次
beforeAll()
// 所有测试执行结束后触发，只触发一次
afterAll()
// 在每个测试执行前触发
beforEach()
// 在每个测试执行结束后触发
afterEach()
```

要体现钩子在测试中的重要地位，我简单看一个测试的基本原则，就是**每个测试应当保持相互独立**。也就是说，当我们测试一个复杂类的各种情况时，类内部拥有自己的状态。当一个测试结束时（改变了类的内部状态），我们忘记将其重置，在下一个测试中我们很容易感到困惑（测试看起来应该是通过的但是却失败了）。因为，我们产生了一个隐型的变化源，这将使得我们需要额外花费精力记住每次测试后状态的改变，这很容易让测试变得困难并出错。正确的做法应该是在 `beforEach` 钩子中重新 `new` 一个新的实例以重置状态。

```js
// example/car.js

module.exports = class Car {
  constructor () {
    this.oilMass  = 10
  }

  start (mileage) {
    this.oilMass = mileage * .1
  }

  addOil (rise) {
    this.oilMass += rise
  }

}
```

```js
// jest ☞ jest-test/mock.js

const Car = require('../example/car')

describe('mock',  ()  =>{
  let car

  beforeEach(() => car = new Car())

  it('行驶', () => {
    car.start(10)
    expect(car.oilMass).toBe(1)
  })

  it('加油', () => {
    car.addOil(1)
    expect(car.oilMass).toBe(11)
  })
})

// 另外，我们还可以单独测试一个用例
// 而不用担心受到其他测试的限制
```



到此为止，mocha 和 jest 的基本使用讲完了，很轻松，对吧！我想您一定充满信心。那么，我们再学一些具有挑战的东西，它们各自“的高级”特性。

# Jest 的 mock 

jest 的 mock，简而言之，就是各种模拟，比如 function（函数）、Timer（定时器）、Manual （数据）、ES6 Class（类） 等等。

如果我们的测试函数接受一个回调函数，这个回调函数在内部被调用或进一步传递，而这个过程，我们根本无力进行测试。但是通过 mock function 模拟一个 fn 作为测试的回调函数，我们就有能力进行各种测试，比如测试 fn 的参数的个数、参数的值、是否被调用、调用次数以及调用的返回值等等。

我们先看一下，mock function 的具体使用。

```js
// example/callback.js

module.exports = function callback (fn) {
  return fn(1, 2)
}
```

```js
// jest-test/mock.test.js

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
```

（未完，待续）