## 数据绑定

将数据绑定到组件上，以便让它们渲染到页面。页面渲染相关的数据放在`Page({data: {}})` 中，页面模板中绑定要渲染的数据使用 `{{ }}`绑定数据。

<div class="custom-block tip">
  <p class="custom-block-title">理解data和this.setData</p> 
  <p>setData的数据是一个js对象;所有setData会把数据最终放到了data中</p>
  <p>这也很好理解，data是存放数据的，可以直接在data中定义数据，但是一些数据并不是提前定义好的，是在某个场景下产生的，就用setData往data中写入数据</p>
</div>

<font style="color:#3eaf7c;">两种方式本质都是在data中添加数据，只是在第二种方式中，小程序底层为我们做了向data中添加数据。</font>

##### 数据绑定操作步骤：

1. 新增一个页面data, 在页面 js 中定义参与页面渲染的数据。

```js
Page({
  data: {
    message: 'hello world',
    id: 'myid',
    myclass: 'myclass'
  }
})

```

​	2.在页面` wxml `中使用 {{ }} 绑定数据。

```js
<view id="{{id}}" class="{{myclass}}">{{message}}</view>

```

🖌

<ul class="list-paddingleft-2"><li><p>对于所有要进行数据绑定的变量，都应该预先在data中进行定义</p></li><li><p>data里的定义类似于初始值</p></li><li><p>如果要更新改动初始值，就使用setData</p></li></ul>

## 插值表达式

在{{}}插值表达式中可以写各种表达式，但是不支持函数调用和完整语句。

支持：

- 数据属性，如：`{{ message }}`
- 路径运算，如：`{{ list[0] }}`、`{{ obj.name }}`
- 算术运算，如：`{{ num1 * num2 }}`
- 逻辑运算，如：`{{ a > b }}`
- 三元运算，如：`{{ a > b ? "大" : "小" }}`
- 字符串连接，如：`{{ "hello," + name }}`

不支持：

- 函数调用，如： `{{ str.split(',') }}`、`{{ test1(str) }}`
- 完整语句，即含有js关键字的语句，如：`{{ var a = 1 }}`

## 列表渲染

列表渲染就是在页面的某个位置上，将一个数组数据遍历生成结构相同的一组界面元素。列表渲染的语法是`wx:for="{{数据}}"`。默认由 `item` 和 `index` 两个变量来获取当前遍历的数据和索引。

准备一个数组数据。

```js
Page({
  data: {
    list: ['三国演义', '红楼梦', '水浒传', '西游记']
  }
})

```

在列表项上添加 `wx:for="{{ xxx }}"` ，以及使用 `item` 和 `index` 变量完成列表渲染。

```js
<view wx:for="{{list}}">{{index + 1}}---{{item}}</view>

```

## 列表渲染 - 更改默认变量

在进行列表渲染时， 默认由 `item` 和 `index` 两个变量来获取当前遍历的数据和索引。我们可以修改列表渲染中的默认变量名 item 和 index。通过在含有 `wx:for` 的标签上添加 `wx:for-item="新元素变量名"` 和 `wx:for-index="新索引变量名"` 进行修改。

```js
<view wx:for="{{list}}">{{index + 1}}---{{item}}</view>

<view wx:for="{{list}}" wx:for-item="book" wx:for-index="i">
  {{i + 1}}---{{book}}
</view>

```

## 列表渲染 - 性能优化

在进行列表渲染时，我们通常为列表渲染的元素添加 wx:key 属性来提升渲染性能。当为列表元素设置 `wx:key` 属性值后，会在列表发生重新渲染时根据 `wx:key` 的值对新数组元素做唯一性鉴定，**判断是否可以复用现有组件实例**。

- 数组元素是 `对象` 时：设为对象中代表唯一性的属性名，如 `wx:key="id"`
- 数组元素是 `字符串或数字` 时：设为固定值 `wx:key="*this"`

```js
<view wx:for="{{list}}" wx:key="*this">{{index + 1}}---{{item}}</view>

<!-- 字符串型数组/数字型数组 指定key为*this -->
<view wx:for="{{list}}" wx:for-item="book" wx:for-index="i" wx:key="*this">
  {{i + 1}}---{{book}}
</view>

<!-- 对象型数组 指定key为唯一标识的属性名即可 -->
<view wx:for="{{list2}}" wx:key="id">{{item.name}}</view>

```

## 条件渲染

条件渲染是通过逻辑条件来控制组件是否显示。

语法：

```
wx:if="{{条件一}}"
wx:elif="{{条件二}}"
wx:else
```

在 page.js 中定义一个数据。

```js
Page({
  data: {
  	year: 0
  }
})

```

在组件上添加条件渲染属性。

```js
<view wx:if="{{year < 2}}">初级前端</view>
<view wx:elif="{{year < 4}}">中级前端</view>
<view wx:elif="{{year < 6}}">高级前端</view>
<view wx:else>专家</view>
```

## block标签

> 使用 标签将控制属性（列表渲染或条件渲染的属性）从组件上分离出去。`<block/>` 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。template 空标签(不渲染任何实质的内容) 用于包裹一堆标签。使用 `<block>` 标签的好处是提高代码可读性、可以提升某些场景下的性能、不会创建额外的组件实例。

条件渲染示例：

```js
<!-- 使用前 -->
<view wx:if="{{ isShow }}">A</view>

<!-- 使用后 -->
<block wx:if="{{ isShow }}">
  <view>A</view>
</block>
```

列表渲染。

```js
<!-- 使用前 -->
<view wx:for="{{books}}">
	{{ item.name }}
</view>

<!-- 使用后 -->
<block wx:for="{{books}}" wx:key="id">
  <view>{{ item.name }}</view>
</block>
```

减少判断，用于提升性能。

```js
<!-- 使用前 -->
<view wx:if="{{isShow}}">hello</view>
<text wx:if="{{isShow}}">world</text>
<button wx:if="{{isShow}}">按钮</button>

<!-- 使用后 -->
<block wx-if="{{isShow}}">
  <view>hello</view>
  <text>world</text>
  <button>按钮</button>
</block>
```