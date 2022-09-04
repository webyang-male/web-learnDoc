

小程序官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html

### 什么是事件

- 事件是视图层到逻辑层的通讯方式。
- 事件可以将用户的行为反馈到逻辑层进行处理。
- 事件可以绑定在组件上，当达到触发事件，就会执行逻辑层中对应的事件处理函数。
- 事件对象可以携带额外信息，如 id, dataset, touches。

### 监听事件

为小程序组件添加事件监听。

语法：

- bind事件名="事件监听函数名"
- bind:事件名="事件监听函数名"

编写 button 组件，并使用`bind事件名` 或 `bind:事件名`添加点击事件。

```js
<button bindtap="tapHandler">按钮</button>
<button bind:tap="tapHandler">按钮</button>
```

在页面js中添加事件监听函数。

```js
Page({
  // 事件监听函数
	tapHandler() {
  	console.log('按钮被点击')
  }
})
```

### 事件冒泡以及阻止冒泡

事件冒泡就是事件从目标组件向最外层组件逐层传递。点击子组件，它的父组件也能触发点击事件。`bind:事件名` 语法监听的就是事件的冒泡阶段。因此事件在当前组件上处理完后，会继续向父组件传递并触发父组件上的事件监听。

在 wxml 中编写两个父子结构的组件，并添加 tap 事件监听。

```js
<view style="width: 300rpx; height: 300rpx; background-color: pink;" bind:tap="tapHandler1">
  外层
  <view style="width: 200rpx; height: 200rpx; background-color: teal;" bind:tap="tapHandler2">
    内层
  </view>
</view>
```

在页面js中编写事件监听函数。

```js
Page({
  tapHandler() {
    console.log('我被触摸了');
  },
  tapHandler1() {
    console.log('外层被点击了...');
  },
  tapHandler2() {
    console.log('内层被点击了...');
  }
})

```

### 阻止冒泡

阻止冒泡就是点击子组件后，事件不再继续向父组件传递的效果（即父组件的事件监听不会被触发）。

语法：

- catch事件名="事件监听函数"
- catch:事件名="事件监听函数"

在 wxml 中编写两个父子结构的组件，并使用 `catch事件名` 代替 `bind事件名` 进行事件监听。

```js
<view style="width: 300rpx; height: 300rpx; background-color: pink;" bind:tap="tapHandler1">
  外层
  <view style="width: 200rpx; height: 200rpx; background-color: teal;" catch:tap="tapHandler2">
    内层
  </view>
</view>
```

在页面js中编写事件监听函数。

```js
    Page({
  tapHandler() {
    console.log('我被触摸了');
  },
  tapHandler1() {
    console.log('外层被点击了...');
  },
  tapHandler2() {
    console.log('内层被点击了...');
  }
})
```

### 路由

小程序官方文档：https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/route.html

![](https://picx.zhimg.com/80/v2-313db01d07a39a0ddde6fc900799ed95_720w.png)

经常使用的路由跳转的api有wx.navigateTo、wx.redirectTo、wx.switchTab。

区别：

- wx.navigateTo：跳转到应用内的某个页面，不能跳到 tabbar 页面 （push）
- wx.redirectTo：重定向的方式跳转到应用内的某个页面，不能跳到 tabbar 页面（replace）
- wx.switchTab：跳转到 tabBar 页面

`wx.navigateTo({url})`：相当于跳转到当前页面的子页面，因为可以从子页面返回到父页面去；会保留当前的父页面并跳转到子页面，最多能保留5个页面，页面栈里面的元素最多不能超过 10 个；跳转时父页面不会执行声明周期函数。

`wx.redirectTo({url})`：关闭当前页面跳转到另外一个页面去，是不能返回的，只不过在新版的小程序中多了一个回到主页的功能

`wx:navigateTo `是不会关闭当前页面的，当前页面会被保留在栈里面。

`wx:refirectTo `在跳转之后会销毁当前页面。



示例：

````xml
<view bind:tap="onTap" class="journey-container">
    <text  class="journey">开启小程序之旅</text>
</view>
````

````js
Page({
  onTap:function(params) {
    wx.switchTab({
      url:"/demo/demo/demo"
    })
  },  
})
````

