
- [单元测试是什么？](#单元测试是什么？)
- [第一个测试](#第一个测试)
- [异步](#异步)
- [钩子](#钩子)
- [Jest mock](#jest-mock)
    - [mock function](#mock-function)
    - [mock timer](#mock-timer)
- [mocha 万花筒](#mocha-万花筒)
- [jest 断言](#jest-断言)
    - [修饰符](#修饰符)
    - [匹配器](#匹配器)
        - [基础](#基础)
        - [相等](#相等)
        - [数值](#数值)
        - [字符串](#字符串)
        - [数组](#数组)
- [chai](#chai)
    - [语言链](#语言链)
    - [修饰符](#修饰符)
    - [断言](#断言)
- [覆盖率测试](#覆盖率测试)
- [babel 支持](#babel-支持)


# 单元测试是什么？

我本来打算先一条一条列出测试给我们的**前端**项目带来的“先民血统”（保证项目的质量）和“劳动力解放”（自动化的力量）等诸多良好特性。但转念一想，您既然来了肯定是知道测试的种种好处，至少您也肯定知道 100% 覆盖率的测试真是亮瞎眼的装逼利器。

你认为测试难吗？

我觉得一点都不难，反而觉得到处在复制和粘贴测试代码。这可不是代码缺少复用性，我只是懒和**测试根本没什么套路可言**。这句话，并不是说写测试像读网文小说一样没内涵，而是力求**简洁直白**。

如果你听过 TDD（测试驱动开发），对单元测试一定不会陌生，它是对一个模块、类或函数进行断言返回值的结果是否符合预期的结果。既然称为单元，也就是意味着我们要进入每个函数体，检查每行代码的执行情况，是一种精细的测试。


看到本教程的题目，您可能已经听说过 mocha 和 jest 的大名，也许您已经使用 mocha 写过一些测试。我之所以把长得跟一个妈生的两兄弟放在一起，就是因为他们实在太像了，既然要学，为什么我们不能一次掌握两个目前最火的单元测试框架呢。答案是，可以的。

那么，我们开始吧！

# 第一个测试

**特别声明：以下所有例子都已通过测试，您还可以在  [github/asVenus](https://github.com/yeshimei/asVenus/tree/master/unit%20test%20for%20mocha%20and%20jest)  查看本教程完整实例代码帮助你更好学习。**


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
describe('第一个测试',  () => {
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

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.1%20%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%B5%8B%E8%AF%95%E7%9A%84%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C.png?raw=true)

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

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.2%20jest%20%E7%9A%84%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%B5%8B%E8%AF%95%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9E%9C.png?raw=true)


> 如果你看到命令行抛出以下报错：  
> `Cannot find module 'source-map-support' from 'source-map-support.js'`   
> 你还需要执行 `npm i source-map-support -D` 安装 jest 的依赖。然后再次执行即可。

那么，现在你应该能理解单元测试的本质了吧，就是断言，**就是输入一个值然后根据一个断言的规则最后看是否符合期待值。**



# 异步

前端业务中的异步场景多如牛毛，比如一个普通的回调、promise、监听事件、执行动画和接口调用等等。

mocha 和 jest 对于 `promise` 都有良好的支持，使测试更为轻松。

```js
// example/getUserData.js

// 模拟一个获取用户数据的接口调用
module.exports = function getUserData() {
  return new Promise(resolve => {
    // 一秒后异步成功，返回一个 'ok'
    setTimeout(() => resolve('ok'), 1000)
  })
}
```

mocha 和 jest 都可以直接将 `promise` 返回。

```js
// mocha ☞ test/async.test.js

it('promise', () => {
  return getUserData()
    .then(data => {
      expect(data).to.be.equal('ok')
    })
})
```


```js
// jest ☞ jest-test/async.test.js

it('promise', () => {
  return getUserData()
    .then(data => {
      expect(data).toBe('ok')
    })
})
```

另外，jest 还可以通过 `resolves/rejects` 修饰符直接测试 `promise` 的成功或失败状态。

```js
// jest ☞ jest-test/async.test.js

it('promise2', () => {
  return expect(getUserData()).resolves.toBe('ok')
})

```

mocha 和 jest 的 `async/await` 用法。

```js
// mocha ☞ test/async.test.js

it('sync', async () => {
  expect(await getUserData()).to.be.equal('ok')
})
```



```js
// jest ☞ jest-test/async.test.js

it('async', async () => {
  expect(await getUserData()).toBe('ok')
})
```

对于普通的异步测试（比如一个定时器），我们需要手动使用 done 函数通知测试结束。


```js
// example/timer.js

module.exports = function timer(fn) {
  setTimeout(fn, 1000)
}
```


```js
// mocha ☞ test/async.test.js

it('done',  done => {
  timer(() => {
    // 告诉 mocha 测试已经结束了！
    // 注意，mocha 只会等待 2s
    // 超时后，自动判断为测试失败
    done()
  })
})
```



```js
// jest ☞ jest-test/async.test.js

it('done',  done => {
  timer(() => {
    // jest 等待为 5s
    done()
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

要体现钩子在测试中的重要地位，我简单看一个测试的基本原则，就是**每个测试应当保持相互独立**。也就是说，当我们测试一个复杂类的各种情况时，类内部拥有自己的状态。当一个测试结束时（改变了类的内部状态），我们忘记将其重置，在下一个测试中我们很容易感到困惑（测试看起来应该是通过的但是却失败了）。因为，我们产生了一个隐式的变化源，这将使得我们需要额外花费精力记住每次测试后状态的改变，这很容易让测试变得困难并出错。正确的做法应该是在 `beforeEach` 钩子中重新 `new` 一个新的实例以重置状态。

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

钩子和一个 it 测试单例没什么区别，你也可以返回一个 promise 或使用 done 函数把同步的钩子变为异步的钩子。另外还有一点，钩子是具有作用域，当你放到 `describe`（测试组）内，仅对组内的所有测试用例有效，当放到外面时将会当前文件中所有的测试有效。

```js
// 对所有测试有效
beforeEach()

describe('测试组一', () => {
  // 仅对测试一，测试二有效
  afterEach()    
  
  it('测试一')
  it('测试一')
})

describe('测试组二', () => {
  it('测试三')
})
```




到此为止，mocha 和 jest 的基本使用讲完了，很轻松，对吧！我想您一定充满信心。那么，我们再学一些具有挑战的东西，它们各自的“高级”特性。

# jest mock 

jest 的 mock，简而言之，就是各种模拟，比如 Function（函数）、Timer（定时器） 等等。


## mock function

我们先看一下，mock function 的具体使用。

如果我们的测试函数接受一个回调函数，这个回调函数在内部被调用或进一步传递，而这个过程，我们根本无力进行测试。但是通过 mock function 模拟一个 fn 作为测试的回调函数，我们就有能力进行各种测试，比如测试 fn 的参数的个数、参数的值、是否被调用、调用次数以及调用的返回值等等。



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

## mock timer

原生的定时器函数（setTimeout, setInterval, clearTimeout, clearInterval）并不是很方便测试，因为程序需要等待相应的延时。`mock timer` 通过覆盖原生定时器函数，可以让您测试定时器是否被调用、传入的参数是否是函数以及等待的时间、甚至还可以控制时间流。

```js
// example/timer.js

module.exports = function timer(fn) {
  setTimeout(fn, 1000)
}
```

```js
const timer = require('../example/timer')

// 让 jest 覆盖全局定时器并重置记录状态
beforeEach(() => jest.useFakeTimers())

it('mock timer', () => {
  // 创建一个 mock function 
  const fn = jest.fn()
  // 作为 timer 的回调函数
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
```


# mocha 万花筒

mocha 在测试报告的输入格式下了大功夫，提供给您足够多的选择，这一节更像是对命令行界面设计的展览。

在命令行执行以下命令，你将会看到不同输入格式。

```
$ mocha --reporter 格式名
```

**spec**（默认）- 分层规格列表

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.3%20spec.png?raw=true)

**dot** - 点矩阵

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.4%20dot.png?raw=true)

**json** - json 对象

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.5%20json.png?raw=true)

**progress** - 进度条

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.6%20progress.png?raw=true)


**list** - 规格式列表

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.7%20list.png?raw=true)

**tap** - 测试任何协议

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.9%20tap.png?raw=true)

**landing** - unicode 的起落跑道

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.10%20landing.png?raw=true)

**min** - 最少信息输入

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.11%20min.png?raw=true)


**nyan** - 一只 nyan 喵!

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.12%20nyan.png?raw=true)

**markdown** - markdown 文档 (github 口味)

你可以重定向为一个 md 文件

```bash
$ mocha --reporter markdown > test-reporter.md
```

[查看本教程生成的 test-reporter](https://github.com/yeshimei/asVenus/tree/master/unit%20test%20for%20mocha%20and%20jest/test-reporter.md)


# jest 断言

jest 的断言风格和 chai 的 expect 相同。

```js
expect(actual).toBe(expected)
```

## 修饰符

修饰符用来限定断言的某种行为，放在断言函数或属性的前面。（只列出部分常用的修饰符）

- **not** - 对断言取反
- **resolves** - promise 的成功状态
- **rejects** - promise 的失败状态

```js
expect(true).not.beTo(false)
```

## 匹配器

Jest 使用**匹配器**让你可以用各种方式测试你的代码。这里我们介绍一些常用的匹配器快速开始您项目的测试。在 [expect API](https://jestjs.io/docs/zh-Hans/expect) 里可以查看到完整的列表。

### 基础

`toBeNull` 只匹配 null。

```js
expect(null).toBeNull()
```

`toBeUndefined` 只匹配 undefined。

```js
expect(undefined).toBeUndefined()
```

`toBeDefined` 与 toBeUndefined 相反。

```js
expect(1).toBeDefined()
```

`toBeTruthy` 匹配任何可以类型转换为 true 的值。


```js
expect(true).toBeTruthy()
expect('sunny').toBeTruthy()
expect(1).toBeTruthy()
expect([]).toBeTruthy()
```

`toBeFalsy` 匹配任何可以类型转换为 false 的值。

```js
expect(false).toBeFalsy()
expect('').toBeFalsy()
expect(0).toBeFalsy()
```


`toBeNaN`  只匹配 NaN。


```js
expect(NaN).toBeNaN()
```

`toHaveLength` 检查数组或字符串的 length

```js
expect([1, 2, 3]).toHaveLength(3)
expect('abcd').toHaveLength(4)
```

### 相等

`toBe` 使用 Object.js 方法进行相等比较。

```js
expect(3).toBe(3)
expect(NaN).toBe(NaN)  // 通过
```

`toEqual` 递归检查对象或数组的每个字段。

```js
expect({name: 'sunny', age: 22}).toEqual({age: 22, name: 'sunny'})
expect(['sunny', 22]).toEqual(['sunny', 22])
```


### 数值

`toBeGreaterThan` 检查是否大于指定值。


```js
expect(10).toBeGreaterThan(3)
```

`toBeGreaterThanOrEqual` 检查是否大于等于指定值。

```js
expect(10).toBeGreaterThanOrEqual(3)
expect(10).toBeGreaterThanOrEqual(10)
```

`toBeLessThan` 检查是否小于指定值。

```js
expect(10).toBeLessThan(20)
```

`toBeLessThanOrEqual`  检查是否小于等于指定值。

```js
expect(10).toBeLessThanOrEqual(20)
expect(10).toBeLessThanOrEqual(10)
```

### 字符串

`toMatch` 使用正则表达式匹配字符串。

```js
expect('mocha and jest').toMatch(/jest/)
```

### 数组

`toContain` 检查一个数组或可迭代对象是否包含某项，还可以检查字符串是否包含每个字符串。

```js

expect([1, 2, 3]).toContain(3)
expect('mocha and jest').toContain('and')
```

# chai

[chai](https://www.chaijs.com/api/assert/) 是一种支持多种风格（比如 expect 和 should）的断言库，我们只介绍 expect。


```js
const expect = require('chai').expect

expect(actual).to.be.equal(expected)
```

## 语言链

语言链是单纯提供以提高断言的可读性，它们一般不提供测试功能（也就是可有可无，写不写都行）

- to
- be
- been
- is
- that
- which
- and
- has
- have
- with
- at
- of
- same

## 修饰符

- **not** - 对断言取反
- **deep** - 深度递归
- **length** - 获取长度

```js
expect(true).not.be.to.equal(false)
expect('abc').length.be.to.equal(3)
```

## 断言

chai 部分断言和 jest 的匹配器使用上基本一致。这里简略地列出了一些 chai 常用的断言，以供您使用和查阅。在 [Assert - Chai](https://www.baidu.com/link?url=jh6QCmpAXdXw2tqnTDyI6e2MjKJIphb713zQlMYKuAQdFIUBxAC6OokQGIv9w50R&wd=&eqid=d33db22b0011d15e000000035cc3e9f2) 可以查看到完整断言的列表。


```js
// 是否为真值（转换为 true 的值）
ok
true
false
null
undefined
NaN
// 是否存在（即非 null 也非 undefined）
exist
// 是否为空
// 对于数组和字符串，它检查 length 属性
// 对于对象，它检查可枚举属性的数量
empty

// 断言值的类型
a/an(type)

// 严格相等（===）
equal(value)
// 相当于 deep.equal
eql(value)

// 数值相关的断言
above(value)           // 大于
below(value)           // 小于
most(value)            // 不大于
least(value)           // 不小于
within(start, finish)  // 闭合区间

// 对象拥有某个为名 name 的属性
property(name, [value])
// 启用 deep 修饰符后，还支持路径查询
deep.property('obj.a[1].c', 'sunny')

// 正则
match(regexp)
// 是否包含指定字符串
string(string)
```


# 覆盖率测试

jest 集成了覆盖率测试，只需要在 `babel.config.js` 开启 `collectCoverage` 字段即可。

```js
// jest.config.js

module.exports = {
  // 开启覆盖率测试
  collectCoverage: true,
  // 忽略的目录
  coveragePathIgnorePatterns: [
    'node_modules'
  ]
}
```

然后，在命令行执行 `jest jest-test` 就会带上覆盖率测试的报告。由于，本教程的实例代码很简单，我们已经达成了 100% 的装逼成就。覆盖率报告会详细的列出每次测试文件的 
- **Stmts** - 测试的有效代码行数
- **Bracnh** - 代码分支
- **Funcs** - 函数声明以及调用等
- **Lines** - 测试执行到行级的情况
- **Uncovered Line #s** - 当未到达 100% 时，会显示具体哪一行没测试到。

![image](https://github.com/yeshimei/asVenus/blob/master/chart%20bed/unit%20test%20for%20mocha%20and%20jest/1.13%20jest%20%E7%9A%84%E8%A6%86%E7%9B%96%E7%8E%87%E6%B5%8B%E8%AF%95.png?raw=true)

100% 覆盖率的测试的确闪眼，但一味追求覆盖率很可能会适得其反，很可能会改动代码而自"以为聪明地"绕过  `Uncovered Line` 通过覆盖率测试，这种行为非常危险，会让测试质量变得不可靠，甚至使代码为了测试而编写。所以，无论任何情况下，覆盖率测试只能作为**测试质量的一个参考标准**，告诉我们测试是否不够精确、哪里存在疏漏。这一点，我们都应该铭记于心。


mocha 则需要第三方工具配合。

# babel 支持

引入对 babel 的支持，可以让我使用 es6 moduel 的导入方式和一些提案语法并且可以与基于 babel 做兼容的项目无缝衔接。

**mocha：**

```
$ npm i babel-core babel-preset-env babel-runtime -D
```

在项目根目录下创建 babel 的配置文件 `.babelrc`。

```js
// .babelrc

{
  "presets": [ "env" ],
  "plugins": ["transform-runtime"]
}
```

在 `test` 测试目录下创建 mocha 的配置文件 `mocha.opts`。

```bash
# 测试报告输出的格式
--reporter tap
# 递归测试所有的目录和文件
--recursive
# 启动观察
# 只看文件发生改动自动重新启动测试
--watch
# 开启桌面通知
--growl
# 关键，让 mocha 支持 babel
--require babel-core/register
```

> 注意，以上注释只是为了对每个配置项进行说明。在您的配置文件中不能带有任何注释信息。

**jest：**

```bash
$ npm i babel-jest @babel/core @babel/preset-env -D
```

在项目根目录下创建 babel 的配置文件 `babel.config.js`

```js
// .babelrc

{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
```

在根目录下打开命令行，执行 `jest --init` 命令生成 jest 的配置文件 `jest.config.js`