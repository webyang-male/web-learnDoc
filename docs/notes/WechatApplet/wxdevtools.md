### 项目配置

#### 开启、关闭HTTPS证书

![](https://pic1.zhimg.com/80/v2-dabcd1825e3983a683cb8b9d2bd8c174_720w.png)

#### npm包构建

<font style="color:orange;">在微信小程序中，不能像`nodejs`构建的前端工程一样直接引入依赖包。</font>

在微信开发者工具中选择 工具/构建`npm` 执行后，就会生成 `miniprogram_npm`目录，项目中就可以直接引用这个目录下的包。

#### 自定义编译

点击工具栏中的编译按钮或者使用快捷键 `Ctrl(⌘) + B`，可以编译当前代码，并自动刷新模拟器。

同时为了帮助开发者调试从不同场景值进入具体的页面，开发者可以添加或选择已有的自定义编译条件进行编译和代码预览（如图）。

**注：编译条件跟项目相关，每个项目可以保存自己相关的编译条件**

https://developers.weixin.qq.com/miniprogram/dev/devtools/debug.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BC%96%E8%AF%91

![](https://pic2.zhimg.com/80/v2-856f376a149d86c298a5e4b869376ff0_720w.png)