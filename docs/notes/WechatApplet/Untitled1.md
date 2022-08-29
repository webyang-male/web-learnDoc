### 1.项目目录结构介绍

#### 1.1 pages目录

​	pages目录下放的就是小程序中的各个页面。在pages中创建页面的时候，会出现4个文件：

* xxx.js：页面相关的js代码可以写在这里
* xxx.wxml：这个就是页面文件，相当于我们之前的HTML，所以页面结构内容写在这里
* xxx.wxss：页面的样式内容，相当于之前的css，所以页面相关的样式可以写在这里
* xxx.json：页面有关的配置，比如页面导航栏的背景色、内容等等

#### 1.2 app.js文件 

​	app.js文件是整个项目的一个==总体配置==。里面包含了项目运行==生命周期的回调函数==。

#### 1.3 app.json文件

​	app.json文件是==整个项目的配置文件==。里面配置了页面，窗口的设置等等。小程序根目录下的 `app.json` 文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。

#### 1.4 app.wxss文件

* app.wxss 文件是微信小程序项目的全局样式表，它可以应用到所有的wxml文件中。
* 微信小程序中使用 rpx 作为长度单位。1rpx = 1/750 屏幕宽度。也就是屏幕宽度等于 750rpx。
* px 也可以使用，表示的是设备独立像素。
* 建议使用长度单位 rpx。它自动做了适配。

#### 1.5 project.config.json文件

​	`project.config.json`文件是==小程序项目的配置文件（如开发工具的外观配置），一般不需要修改。

​	`"checkSiteMap":false`作用是控制台不要有一些没用的警告。

​	`Sitemap.json`：搜索功能文件，指定哪些页面可以被搜索，可被配置。是在搜索小程序的时候，指定哪些页面允许被搜索到。

### 2.app.json

小程序根目录下的 `app.json` 文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。

小程序根目录下的 `app.json` 文件用来对微信小程序进行全局配置。文件内容为一个 JSON 对象，有以下属性：

​	https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html

####  tabbar的配置

​	小程序根目录下的 `app.json` 文件用来对微信小程序进行全局配置，决定页面文件的路径、窗口表现、设置网络超时时间、设置多 tab 等。（只有全局的app.json 才有）

​	如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面。

| 属性            | 类型     | 必填 | 默认值 | 描述                                                         |
| :-------------- | :------- | :--- | :----- | :----------------------------------------------------------- |
| color           | HexColor | 是   |        | tab 上的文字默认颜色，仅支持十六进制颜色                     |
| selectedColor   | HexColor | 是   |        | tab 上的文字选中时的颜色，仅支持十六进制颜色                 |
| backgroundColor | HexColor | 是   |        | tab 的背景色，仅支持十六进制颜色                             |
| borderStyle     | string   | 否   | black  | tabbar 上边框的颜色， 仅支持 `black` / `white`               |
| list            | Array    | 是   |        | tab 的列表，详见 `list` 属性说明，最少 2 个、最多 5 个 tab   |
| position        | string   | 否   | bottom | tabBar 的位置，仅支持 `bottom` / `top`                       |
| custom          | boolean  | 否   | false  | 自定义 tabBar，见[详情](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html) |

其中 list 接受一个数组，**只能配置最少 2 个、最多 5 个 tab**。tab 按数组的顺序排序，每个项都是一个对象，其属性值如下：

| 属性             | 类型   | 必填 | 说明                                                         |
| :--------------- | :----- | :--- | :----------------------------------------------------------- |
| pagePath         | string | 是   | 页面路径，必须在 pages 中先定义                              |
| text             | string | 是   | tab 上按钮文字                                               |
| iconPath         | string | 否   | 图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片。 **当 `position` 为 `top` 时，不显示 icon。** |
| selectedIconPath | string | 否   | 选中时的图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，不支持网络图片。 **当 `position` 为 `top` 时，不显示 icon。** |

### 3.WXSS

https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html

WXSS (WeiXin Style Sheets)是一套样式语言，用于描述 WXML 的组件样式。WXSS 用来决定 WXML 的组件应该怎么显示。

为了适应广大的前端开发者，WXSS 具有 CSS 大部分特性。同时为了更适合开发微信小程序，WXSS 对 CSS 进行了扩充以及修改。

与 CSS 相比，WXSS 扩展的特性有：

- 尺寸单位
- 样式导入

#### 尺寸单位

rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

尺寸单位：750的设计稿(物理像素)刚好等于750rpx，即，750px=750rpx

**样式导入：**

从一个.wxss导入到另一个.wxss

```css
@import 'wxss的相对路径';
```

### 4.微信小程序组件（WXML）

官方指南：https://developers.weixin.qq.com/miniprogram/dev/component/

WXML 是小程序的标签语言 ，作用和 HTML 一样。

常用的标签（也称组件）如下：

- 容器类组件 `<view>` => 相当于HTML的 `div`
- 内容类组件 `<text>` => 相当于HTML的 `span`
- 媒体类组件 `<image>` => 相当于HTML的 `img`
- 导航类组件`<navigator>` => 相当于HTML的 `a`
- 表单类组件 `<input>` 、`<button>`
- 轮播图组件 `<swiper>`