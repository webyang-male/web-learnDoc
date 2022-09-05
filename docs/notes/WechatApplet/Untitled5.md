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

