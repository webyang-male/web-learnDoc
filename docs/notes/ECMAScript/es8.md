async 和 await 是一种更加优雅的异步编程解决方案，是Promise 的拓展。

在我们处理异步的时候，比起回调函数，Promise的then方法会显得较为简洁和清晰，但是在处理多个彼此之间相互依赖的请求的时候，就会显的有些繁琐。这时候，用async/await更加优雅。

JavaScript 是单线程的，使用 Promise 之后可以让我们书写异步操作更加简单，而 async 是让我们写起 Promise 像同步操作。

### 基本语法

前面添加了async的函数在执行后都会自动返回一个Promise对象:

```js
function foo() {
    return '大耳朵猴'
}
console.log(foo()) // '大耳朵猴'
```

相当于

```js
async function foo() {
    return '缨可路的' // Promise.resolve('缨可路的')

    // let res =  Promise.resolve('缨可路的')
    // console.log(res)
}
console.log(foo()) // Promise
foo()
```

await后面需要跟异步操作，不然就没有意义，而且await后面的Promise对象不必写then，因为await的作用之一就是获取后面Promise对象成功状态传递出来的参数。

```js
function timeout() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(1)
            resolve() // resolve('success')
        }, 1000)
    })
}

// 不加async和await是2、1   加了是1、2
async function foo() {
    await timeout() // let res = await timeout() res是success
    console.log(2)
}
foo()
```

### 对于失败的处理

```js
function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('success')
            reject('error')
        }, 3000)
    })
}
async function foo() {
    return await timeout()
}
foo().then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
```

✒在async函数中使用await，那么await这里的代码就会变成同步的了，意思就是说只有等await后面的Promise执行完成得到结果才会继续下去，await就是等待。

### Object 扩展

之前的语法获取对象的每一个属性值：

```js
const obj = {
    name: '百度',
    web: 'www.baidu.com',
    course: 'search'
}
console.log(Object.keys(obj))
const res = Object.keys(obj).map(key => obj[key])
console.log(res)
// ["百度", "www.baidu.com", "search"]
```

ES8中对象扩展补充了两个静态方法，用于遍历对象：`Object.values()，Object.entries()`

#### Object.values()

> Object.values() 返回一个数组，其元素是在对象上找到的可枚举属性值。属性的顺序与通过手动循环对象的属性值所给出的顺序相同(for...in，但是for...in还会遍历原型上的属性值)。

```js
const obj = {
    name: 'zain',
    web: 'https://zain-books.vercel.app/',
    course: 'life'
}

console.log(Object.values(obj))
// ["zain", "https://zain-books.vercel.app/", "https://zain-books.vercel.app/"]
```

#### Object.entries()

> Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致。（区别在于 for-in 循环也枚举原型链中的属性）

```js
let grade = {
    'XL': 98,
    'zain': 87
}

for (let [key, value] of grade) {
    console.log(key, value) // Uncaught TypeError: grade is not iterable
}
```

我们知道 Object 是不可直接遍历的，上述代码足以说明直接遍历触发了错误。如果使用 `Object.entries()` 则可以完成遍历任务。

```js
let grade = {
    'XL': 98,
    'zain': 87
}

for (let [k, v] of Object.entries(grade)) {
    console.log(k, v)
    // XL 98
    // zain 87
}
```

这段代码确实成功的遍历了出来，但是上边说过 Object.entries 返回的是数组，这里面还用了数组的解构赋值

![](https://gitee.com/initzzy/blog-image/raw/master/Object.entries().png)

#### Object.getOwnPropertyDescriptors()

```js
const data = {
    Portland: '78/50',
    Dublin: '88/52',
    Lima: '58/40'
}
```

还是上述那个对象，这里有 key 和 value，上边的代码把所有的 key、value 遍历出来，如果我们不想让 Lima 这个属性和值被枚举怎么办？

```js
Object.defineProperty(data, 'Lima', {
    enumerable: false
})

Object.entries(data).map(([city, temp]) => {
    console.log( `City: ${city.padEnd(16)} Weather: ${temp}` )
    // City: Portland         Weather: 78/50
    // City: Dublin           Weather: 88/52
})
```

很成功，Lima 没有被遍历出来，那么 defineProperty 的第三个参数就是描述符(descriptor)。这个描述符包括几个属性：

- value [属性的值]
- writable [属性的值是否可被改变]
- enumerable [属性的值是否可被枚举]
- configurable [描述符本身是否可被修改，属性是否可被删除]

如果想查看更多细节，访问 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)。

```js
console.log(Object.getOwnPropertyDescriptor(data, 'Lima'))
// {value: "58/40", writable: true, enumerable: false, configurable: true}
```

这个是获取对象指定属性的描述符，如果想获取对象的所有属性的描述符：

```js
console.log(Object.getOwnPropertyDescriptors(data))
```

![](https://gitee.com/initzzy/blog-image/raw/master/getownproperty.png)

### String扩展

在 ES8 中 String 新增了两个实例函数 String.prototype.padStart 和 String.prototype.padEnd，允许将空字符串或其他字符串添加到原始字符串的开头或结尾。

#### String.prototype.padStart()

`String.prototype.padStart()`

把指定字符串填充到字符串头部，返回新字符串。

语法：

> str.padStart(targetLength ,[padString])

|     参数     |                      含义                      | 必选 |
| :----------: | :--------------------------------------------: | :--: |
| targetLength |             目标字符要保持的长度值             |  Y   |
|  padString   | 如果目标字符的长度不够需要的补白字符，默认为空 |  N   |

```js
const str = '我爱你';
console.log(str.padStart(7, '1314'))
console.log(str.padEnd(7, '1314'))
console.log(str.padStart(7))
```

###### 场景1：日期格式化

希望把当前日期格式化城：yyyy-mm-dd的格式：

```js
const now = new Date()
const year = now.getFullYear()
const month = (now.getMonth() + 1).toString().padStart(2, '0')
const day = (now.getDate()).toString().padStart(2, '0')
console.log(year, month, day)
console.log( `${year}-${month}-${day}` )
```

###### 场景2：数字替换

```js
// 数字替换，比如手机号，身份证号
const tel = '13012345678'
const newTel = tel.slice(-4).padStart(tel.length, '*')
console.log(newTel) // *******5678
```

#### String.prototype.padEnd()

方法会用一个字符串填充当前字符串（如果需要的话则重复填充），返回填充后达到指定长度的字符串。从当前字符串的末尾（右侧）开始填充。 语法：

> str.padEnd(targetLength, [ padString])

|     参数     |                      含义                      | 必选 |
| :----------: | :--------------------------------------------: | :--: |
| targetLength |             目标字符要保持的长度值             |  Y   |
|  padString   | 如果目标字符的长度不够需要的补白字符，默认为空 |  N   |

```js
const str1 = 'I am learning es in imooc'
console.log(str1.padEnd(30, '.'))
// I am learning es in imooc.....

const str2 = '200'
console.log(str2.padEnd(5))
// "200  "
```

###### 场景：时间戳统一长度

在JS前端我们处理时间戳的时候单位都是ms毫秒，但是，后端同学返回的时间戳则不一样是毫秒，可能只有10位，以s秒为单位。所以，我们在前端处理这个时间戳的时候，保险起见，要先做一个13位的补全，保证单位是毫秒。

```js
// 伪代码
console.log(new Date().getTime()) // 时间戳 13位的
timestamp = +String(timestamp).padEnd(13, '0')
```

### 尾逗号 Trailing commas

ES8 允许函数的最后一个参数有尾逗号（Trailing comma）。

<font style="color:#FF4500;">此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。</font>

````js
function foo(
  param1,
  param2,
) {
  /* ... */
}

foo(
  'arg1',
  'arg2',
)
````

