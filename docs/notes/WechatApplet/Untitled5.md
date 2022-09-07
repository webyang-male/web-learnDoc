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



