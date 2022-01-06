### for await of

> 异步迭代器(for-await-of)：循环等待每个Promise对象变为resolved状态才进入下一步。

我们知道 for...of 是同步运行的，但有时候一些任务集合是异步的

````js
function foo(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [foo(2000), foo(100), foo(3000)]
    for (let item of arr) {
        console.log(Date.now(), item.then(console.log))
    }
}

test()
// 1641477514603 Promise {<pending>}
// 1641477514603 Promise {<pending>}
// 1641477514603 Promise {<pending>}
// Promise {<fulfilled>: undefined}
// 100
// 2000
// 3000
````

上面实例代码，分别是 2000ms 、100ms、3000ms后任务结束。在上述遍历的过程中可以看到三个任务是同步启动的，然后输出上也不是按任务的执行顺序输出的，这显然不太符合我们的要求。

#### await改造

```js
function Gen(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(time)
        }, time)
    })
}

async function test() {
    let arr = [Gen(2000), Gen(100), Gen(3000)]
    for (let item of arr) {
        console.log(Date.now(), await item.then(console.log))
    }
}

test()
// 2000
// 1560091834772 undefined
// 100
// 1560091836774 undefined
// 3000
// 1560091836775 undefined
```

从返回值看确实是按照任务的先后顺序进行的，其中原理也有说明是利用了 await 中断程序的功能。

在 ES9 中也可以用` for...await...of `的语法来操作：

```js
function getPromise(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                value: time,
                done: false
            })
        }, time)
    })
}
const arr = [getPromise(1000), getPromise(2000), getPromise(3000)]
arr[Symbol.asyncIterator] = function () {
    let nextIndex = 0
    return {
        next() {
            return nextIndex < arr.length ? arr[nextIndex++] :
                Promise.resolve({
                    value: undefined,
                    done: true
                })
        }
    }
}
async function test() {
    for await (let item of arr) {
        console.log(item)
    }
}
test()
```

### RegExp 扩展

#### dotAll 模式

正则表达式中，点（.）是一个特殊字符，代表任意的单个字符，但是有两个例外。一个是四个字节的 UTF-16 字符，这个可以用u修饰符解决；另一个是行终止符（line terminator character）。

- U+000A 换行符（\n）
- U+000D 回车符（\r）
- U+2028 行分隔符（line separator）
- U+2029 段分隔符（paragraph separator）

```js
// const reg = /./
// console.log(reg.test('5')) // true
// console.log(reg.test('x')) // true
// console.log(reg.test('\n')) // false
// console.log(reg.test('\r')) // false
// console.log(reg.test('\u{2028}')) // false
// console.log(reg.test('\u{2029}')) // false

const reg = /./s
console.log(reg.test('5')) // true
console.log(reg.test('x')) // true
console.log(reg.test('\n')) // true
console.log(reg.test('\r')) // true
console.log(reg.test('\u{2028}')) // true
console.log(reg.test('\u{2029}')) // true

```

<div class="custom-block tip"><p class="custom-block-title">TIP</p> <p>记住一句话就可以理解 dotAll 模式：它让 . 名副其实。</p></div>

#### 具名组匹配

````js
// 具名组匹配
// const date = /(\d{4})-(\d{2})-(\d{2})/.exec('2020-01-01')
// console.log(date)
////通过数组来获取这些捕获：
// console.log(date[1])
// console.log(date[2])
// console.log(date[3])
````

如果没有定义 groups 就是 undefined。

````js
const reg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
console.log(reg.exec('2020-02-01'))
const groups = reg.exec('2020-02-01').groups
// const year = groups.year
// const month = groups.month
// const day = groups.day
const {year, month, day} = groups//解构赋值法
console.log(year, month, day)
````

上面这段代码的返回值 groups 已经是 Object 了，具体的值是：

```js
groups{
    "year": "2020",
    "month": "02",
    "day": "01"
}
```

![](https://gitee.com/initzzy/blog-image/raw/master/es9-%E5%85%B7%E5%90%8D%E7%BB%84.png)

#### 后行断言

在 ES9 之前 JavaScript 正则只支持先行断言，不支持后行断言。简单复习下先行断言的知识：

```js
let test = 'hello world'
console.log(test.match(/hello(?=\sworld)/))
// ["hello", index: 0, input: "hello world", groups: undefined]
```

这段代码要匹配后面是 world 的 hello，但是反过来就不成：

```js
let test = 'world hello'
console.log(test.match(/hello(?=\sworld)/))
// null
```

比如我们想判断前面是 world 的 hello，这个代码是实现不了的。在 ES9 就支持这个后行断言了：

```js
let test = 'world hello'
console.log(test.match(/(?<=world\s)hello/))
// ["hello", index: 6, input: "world hello", groups: undefined]
```

(?<...)是后行断言的符号，(?...)是先行断言的符号，然后结合 =(等于)、!(不等)、\1(捕获匹配)。

### Object 扩展

#### Rest & Spread