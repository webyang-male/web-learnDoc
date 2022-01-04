### Array.prototype.includes()

在 ES7 之前想判断数组中是否包含一个元素方法：

```js
console.log(array1.find(function(item) {
    return item === 2
}))
```

或者

```js
console.log(array1.filter(function(item) {
    return item === 2
}).length > 0)
```

ES7引入的Array.prototype.includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回`true`，否则返回`false`。

#### 基本用法

```js
const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es6')) // true
console.log(arr.includes('es9')) // false
```

#### 接收俩个参数

要搜索的值和搜索的开始索引。第二个参数可选。从该索引处开始查找 searchElement。如果为负值，

```js
const arr = ['es6', 'es7', 'es8']
console.log(arr.includes('es7', 1)) // true
console.log(arr.includes('es7', 2)) // false
console.log(arr.includes('es7', -1)) // false
console.log(arr.includes('es7', -2)) // true
```

#### 与indexOf()比较

```js
['a', 'b', 'c'].includes('a') //true
['a', 'b', 'c'].indexOf('a') > -1 //true

console.log(arr.indexOf('es7')) // 1
console.log(arr.indexOf('es7') > -1) // true
```

<div class="custom-block warning"><p class="custom-block-title">注意</p> <p>只能判断简单类型的数据，对于复杂类型的数据，比如对象类型的数组，二维数组，这些是无法判断的.</p></div>

#### 优缺点比较

两者都是采用`===`的操作符来作比较的，不同之处在于：

对于NaN的处理结果不同。我们知道JavaScript中` NaN === NaN` 的结果是`false`, indexOf()也是这样处理的，但是includes()不是这样的。

```js
//===
const demo = [1, 2, 3]
demo.indexOf("2") //-1
demo.includes("1") //false
```

```js
//NaN
const demo = [1, NaN, 2, 3]
demo.indexOf(NaN) //-1
demo.includes(NaN) //true
```

<div class="custom-block tip"><p class="custom-block-title">总结</p> <p>如果只想知道某个值是否在数组中存在，而并不关心它的索引位置，建议使用includes()。如果想获取一个值在数组中的位置，那么只能使用indexOf方法。</p></div>

### 幂运算符  `**`

常规方法实现一个数的求幂运算

```js
function pow(x, y) {
    let res = 1
    for (let i = 0; i < y; i++) {
        res *= x
    }
    return res
}

console.log(pow(2, 10)); 
```

除了自己封装函数来实现，也可是使用 `Math.pow()` 来完成。

> Math.pow() 函数返回基数（base）的指数（exponent）次幂。

```js
console.log(Math.pow(2, 10)) // 1024
```

在 ES7 可以这样写了：

```js
console.log(2 ** 10) // 1024
```

<div class="custom-block danger"><p class="custom-block-title">注意</p> <p>幂运算符的两个*号之间不能出现空格，否则语法会报错。</p></div>

