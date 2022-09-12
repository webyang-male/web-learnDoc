### 自定义属性`data-`

凡是以data-开头的自定义数据， 都会在event的`currentTarget`的`dataset`下显示。

**data-命名规则：**

1.建议使用-连接，如：data-post-id，在dataset下会显示为postId（会自动去除data-）。

2.所有的大写字母在dataset下会自动转换为小写；（不建议在wxml里面使用大写）。   

代码例：

````xml
<block wx:for="{{postList}}" wx:key="index"  wx:for-item="item" wx:for-index="index" data-id="3">
	<post bind:tap = "tappost"  />
</block>
````

![](https://pic2.zhimg.com/80/v2-6026a0a5e8a28d778747eddebec3f353_720w.png)

### 本地缓存

缓存 API 提供了同步和异步版本。

> 在实际开发中的使用原则是：
>
> - 如果一次缓存的数据量较大时，推荐使用异步 API
> - 否则推荐使用同步 API

API：

- setStorage / setStorageSync：设置一个缓存数据
- getStorage / getStorageSync：获取一个缓存数据
- removeStorage / removeStorageSync：删除一个缓存数据
- clearStorage / clearStorageSync：清空所有缓存数据
- getStorageInfo / getStorageInfoSync：获取缓存状态信息

增：

```js
wx.setStorageSync(key,value)；
```

改：

```js
wx.setStorageSync(key,value)；
```

删：

```js
wx.removeStorageSync(key)；
```

清除：

```js
wx.clearStrageSync()；
```

读取：

```js
const key = wx.getStorageSync(key);
console.log(key);       
```

### 界面弹窗

在项目中，我们经常会使用到弹窗来进行交互。

https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html

使用：

1. `wx.showLoading / wx.hideLoading`：显示/隐藏加载框
2. `wx.showModal`：显示确认框(强提示的内容,需要用户主动关闭)
3. `wx.showToast`：显示提示框(自动关闭消息框)

### 音乐API

https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/wx.getBackgroundAudioManager.html

https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/BackgroundAudioManager.html

#### 示例代码

```js
const backgroundAudioManager = wx.getBackgroundAudioManager()

backgroundAudioManager.title = '此时此刻'
backgroundAudioManager.epname = '此时此刻'
backgroundAudioManager.singer = '许巍'
backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
// 设置了 src 之后会自动播放
backgroundAudioManager.src = 'http://xxxx'
```

### tabbar

https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabBar

<font style="color:rgb(34 153 221);">小程序提供了原生的Tabbar支持，我们可以在app.json声明tabBar字段来定义Tabbar页。tabbar页面建议用switchTab方法。</font>       

 app.json定义小程序底部tab

```json
{
  "tabBar": {
    "list": [
      { "text": "Tab1", "pagePath": "pageA" },
      { "text": "Tab1", "pagePath": "pageF" },
      { "text": "Tab1", "pagePath": "pageG" }
    ]
  }
}
```

#### 自定义 tabBar

https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html

<div class="custom-block danger">
  <p class="custom-block-title">注意</p> 
  <p>app.json 文件里的页面路径(pagePath)的配置，都不是以 '/' 打头的。       </p>
</div>

 ````json
   "tabBar": {
     "borderStyle": "white",
     "selectedColor": "#333333",
     "position": "bottom",
     "color": "#999999",
     "list": [
       {
         "text": "阅读",
         "pagePath": "pages/posts/posts",
         "iconPath": "/images/tab/xxx.png",
         "selectedIconPath": "/images/tab/xxxx.png"
       }
     ]
   }
 ````

### 自定义组件

https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/

#### 使用自定义组件

使用已注册的自定义组件前，首先要在页面的 `json` 文件中进行引用声明。此时需要提供每个自定义组件的标签名和对应的自定义组件文件路径：

```json
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}
```

这样，在页面的 `wxml` 中就可以像使用基础组件一样使用自定义组件。节点名即自定义组件的标签名，节点属性即传递给组件的属性值

#### 自定义组件属性

在创建的自定义组件的js中设置属性 type 类型可以自定义 String Number  等任意类型 ，value为属性默认值。

<pre>&nbsp;properties:&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;text:{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;type:Boolean,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;value:true
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;&nbsp;&nbsp;},</pre>

在使用自定义组件的页面中使用自定义组件，首先需要在页面的json文件里引用。

<pre>"usingComponents":&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;"post":"/components/demo/index"
&nbsp;&nbsp;}</pre>

然后在wxml页面按照type类型书写即可

````xml
<post text="{{false}}"/>
````

#### 组件简写

下面的组件案例中text的属性可以简写如下：

````js
 properties: {
        // text:{
        //     type:Boolean,
        //     value:true
        // },
        text:Boolean
    },
````

<font style="color:#3eaf7c;"> 简写不需要写value默认值，会自己按照type类型展示默认。</font>

#### 外部样式类

https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E5%A4%96%E9%83%A8%E6%A0%B7%E5%BC%8F%E7%B1%BB

自定义组件如果需要添加额外的样式，比如margin等，直接在使用自定义组件的页面中给组件添加class类名写样式不会生效

**案例步骤：**

1、在自定义组件的js中的Component里定义externalClass属性 ，属性值自己命名即可，为了规范书写，一般统一格式

```js
externalClasses:['f-class'],
```

2、在自定义组件的wxml中需要添加外部样式的组件的class里加上这个自己命名的外部样式类名

```xml
<view class="container f-class">
```

3、在使用自定义样式组件的页面的wxml组件中添加 f-class（自己命名的属性名和属性值）

```xml
<movie-list f-class="movie-list"/>
```

4、在使用自定义样式组件的页面的wxss中编写f-class值的样式

```css
.movie-list{
  margin-bottom: 30rpx;
  background-color: teal !important;
}
```

如果想要外部样式类的的样式覆盖原自定义组件的样式，使用 `!important `增加权重

### 加载

#### 上划加载刷新动画

https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.showNavigationBarLoading.html

https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.hideNavigationBarLoading.html

##### 示例代码

```js
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // [1,2,3...... 12,13,]
    // [0,1,2....11] + [12,13....23] + [24...35] + [36...47]
    wx.showNavigationBarLoading()//加载动画
    wx.request({
      url: app.gBaseUrl + this.data._type,
      data:{
        //实际场景应该是动态获取并新增数据,不应该覆盖旧数据
        start: this.data.movies.length,
        count:12
      },
      success:(res)=>{
        console.log(res)
        this.setData({
          movies:this.data.movies.concat(res.data.subjects)
        })
        wx.hideNavigationBarLoading()//关闭,一组出现
      }
    })  
  },
```

##### 注意

- [wx.showLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html) 和 [wx.showToast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html) 同时只能显示一个
- [wx.showLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showLoading.html) 应与 [wx.hideLoading](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.hideLoading.html) 配对使用

#### 下拉加载刷新

> https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#%E9%A1%B5%E9%9D%A2%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0
>
> #### onPullDownRefresh()
>
> 监听用户下拉刷新事件。
>
> - 需要在`app.json`的[`window`](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window)选项中或[页面配置](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)中开启`enablePullDownRefresh`。
> - 可以通过[wx.startPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.startPullDownRefresh.html)触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
> - 当处理完数据刷新后，[wx.stopPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.stopPullDownRefresh.html)可以停止当前页面的下拉刷新。

**实现下拉刷新操作需要的步骤：**
   配置页面`enablePullDownRefresh`选项开启

`app.json`全局配置或者页面`json`文件

````json
{
  "enablePullDownRefresh":true
}
````

   在页面下拉对应函数onPussDownRefresh函数去请求数据

````js
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.request({
      url: https://xxxx,
      data:{
        //自定义获取数据起始长度
        start:0,
        count:12,
      },
      success:(res)=>{
        this.setData({
         //....
        })
        wx.stopPullDownRefresh()
      }
    })
  }
````

 备注：下拉刷新处理数据逻辑上是加载最初的数据

### (动态)配置标题

https://developers.weixin.qq.com/miniprogram/dev/api/ui/navigation-bar/wx.setNavigationBarTitle.html

静态页面标题直接在页面的`json`文件中配置

````json
"navigationBarTitleText": "标题内容"
````

<font style="color:#1b91ff;">动态的标题配置</font>，在页面的`onReady`里设置` wx.setNavigationBarTitle`

#### 示例代码

```js
wx.setNavigationBarTitle({
  title: '当前页面'
})
```
