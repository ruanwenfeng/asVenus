
# TOC
   - [异步测试](#)
   - [第一个测试](#)
<a name=""></a>
 
<a name=""></a>
# 异步测试
promise.

```js
return getUserData().then(function (data) {
  expect(data).to.be.equal('ok');
});
```

sync.

```js
var gen = fn.apply(this, arguments);
return new _promise2.default(function (resolve, reject) {
  function step(key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      return _promise2.default.resolve(value).then(function (value) {
        step("next", value);
      }, function (err) {
        step("throw", err);
      });
    }
  }
  return step("next");
});
```

done.

```js
timer(function () {
  // 告诉 mocha 测试已经结束了！
  // 注意，mocha 只会等待 2s
  // 超时后，自动判断为测试失败
  done();
});
```

<a name=""></a>
# 第一个测试
sum.

```js
return (0, _chai.expect)((0, _babelSum2.default)(1, 2)).to.be.equal(3);
```

<a name=""></a>
# 第一个测试
sum.

```js
return expect(sum(1, 2)).to.be.equal(3);
```

[?25h��ֹ�����������(Y/N)? 