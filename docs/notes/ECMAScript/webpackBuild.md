### Webpack基础概念

官方说法是webpack是一个模块打包机，我个人理解是它可以把我们在开发环境下的代码以及依赖文件等打包成在生产环境下可以直接使用的文件。也可以把一些浏览器不能直接运行的文件进行转化，比如是ts、vue、less、scss等。

同时webpack也可以对代码进行优化，比如压缩、合并、文件缓存等等。在项目中我们只需要把相应的配置文件配置好，那么接下来的工作就都可以交给webpack这个全能大神去完成了。

### 官方网站

英文： https://webpack.js.org/

中文：https://webpack.docschina.org/

Github：https://github.com/webpack/webpack

###  核心概念

#### 入口(entry)

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

默认值是 ./src/index.js，但可以通过在 webpack configuration 中配置 entry 属性，来指定一个（或多个）不同的入口起点。例如：

webpack.config.js

```js
module.exports = {
    entry: './path/to/my/entry/file.js'
}
```

#### 输出(output)

output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。

可以通过在配置中指定一个 output 字段，来配置这些处理过程：

webpack.config.js

```js
const path = require('path')

module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js'
    }
}
```

#### loader

webpack 只能理解 JavaScript 和 JSON 文件。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

<div class="custom-block warning"><p class="custom-block-title">注意</p> <p>loader 能够 import 导入任何类型的模块（例如 .css 文件），这是 webpack 特有的功能，其他打包程序或任务执行器的可能并不支持。我们认为这种语言扩展是很有必要的，因为这可以使开发人员创建出更准确的依赖关系图。</p></div>

在更高层面，在 webpack 的配置中 loader 有两个属性：

- test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
- use 属性，表示进行转换时，应该使用哪个 loader。

webpack.config.js

```js
const path = require('path');

module.exports = {
    output: {
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [{
            test: /\.txt$/,
            use: 'raw-loader'
        }]
    }
}
```

#### 插件(plugin)

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

想要使用一个插件，只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建它的一个实例。

webpack.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
    module: {
        rules: [{
            test: /\.txt$/,
            use: 'raw-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
```

#### 模式(mode)

通过选择 development, production 或 none 之中的一个，来设置 mode 参数，可以启用 webpack 内置在相应环境下的优化。其默认值为 production。

```js
module.exports = {
    mode: 'production'
}
```

### 开发环境与生产环境

#### 开发模式 --save-dev

项目在开发编码过程中还未上线使用就属于开发模式，该模式下代码不需要压缩、合并等。比如编写可以使用sass进行css预处理，使用ES6的语法来编写js代码。在开发模式下依赖的包安装的时候就需要使用 `--save-dev` ， `dev` 表示开发的意思，使用 `--save-dev` 安装的依赖包，会安装在 `package.json` 的 `devDependencies` 中，这些依赖包只在开发时候会使用到，在上线生成环境下就不需要了。

#### 生产模式 --save

项目已经开发测试完成需要打包上线进行运营了，这时候就属于生产模式，改模式下的文件需要是最终浏览器可以直接解析的文件，不能再用如 `.scss` 、 `.vue` 、 `.jsx` 等这样的文件了。在生产模式下依赖的包安装的时候就需要使用 `--save` ，使用 `--save` 安装的依赖包，会安装在 `package.json` 的 `dependencies` 中，这些依赖包是最终在上线时候使用到的，比如 `jquery.js` 、 `vue.js` 等。

<div class="custom-block warning"><p class="custom-block-title">注意</p> <p>在开发过程中安装每个依赖包的时候，都一定先考虑这个包是只有开发模式下能用到，还是在生产模式下也需要用到。</p></div>

### 配置

**1.初始化package.json**

```sh
npm init 
```

<div class="custom-block tip"><p class="custom-block-title">TIP</p> <p>目的是生成 <code>package.json</code> 文件。
也可以使用 <code>npm init -y</code> 所有配置都选择默认。</p></div>

**2.项目安装webpack**

```sh
npm i webpack webpack-cli webpack-dev-server --save-dev
```

<div class="custom-block danger"><p class="custom-block-title">注意</p> <p>安装webpack有两种方式：项目安装 和 全局安装。</p> <p>上面的命令是在本项目安装webpack，不推荐全局安装webpack，因为全局安装以后版本就固定了，比如当前电脑中全局安装了V4.43.0这个版本的webpack，如果需要运行一个比较早期版本的项目，比如webpack3.X的项目，就会有问题。另外，如果当前项目是使用V4.43.0版本写的，如果有一天webpack的版本升级了，比如升级到了V5. X，那么之前的项目很有可能就跑不起来了。所以并不建议全局安装，而是建议项目安装。</p></div>

**3.项目根目录下创建 `webpack.config.js` 文件**

```js
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'index.js'
    },
}
```

**4.编译**

```sh
npx webpack
```

<div class="custom-block tip"><p class="custom-block-title">TIP</p> <p>npx 的作用就是调用项目内部安装的模块，因为我们的webpack选择的是项目安装，而不是全局安装。如果是全局安装直接使用 <code>webpack</code> 命令即可。</p></div>

**5.配置html-webpack-plugin**

`html-webpack-plugin` 主要有两个作用

- 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
- 可以生成创建html入口文件

安装：

```sh
npm i html-webpack-plugin --save-dev
```

配置：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'index.js'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
```

配置模板：

```js
new HtmlWebpackPlugin({
    template: './src/index.html'
})
```

**6.配置copy-webpack-plugin**

`copy-webpack-plugin` 的作用就是拷贝文件，或者文件夹。

安装：

```sh
npm install copy-webpack-plugin --save-dev
```

配置：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: 'static'
        }, ])
    ]
}
```

**7.配置文件拆分**

大型项目的 `webpack.config.js` 文件的配置会非常复杂，所以一般会拆分为多个文件。

创建build文件夹，在build中把 `webpack.config.js` 拆分为四个文件：

- webpack.base.config.js 基础配置文件
- webpack.dev.config.js 开发环境下的配置文件
- webpack.pro.config.js 生成环境下的配置文件
- webpack.config.js 总的配置文件

#### webpack.base.config.js

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: 'static'
        }, ])
    ]
}
```

#### webpack.dev.config.js

安装 `cheap-module-eval-source-map` 使用 cheap 模式可以大幅提高 souremap 生成的效率

```js
module.exports = {
    devtool: 'cheap-module-eval-source-map'
}
```

#### webpack.pro.config.js

安装 `clean-webpack-plugin` 自动删除webpack里的dist目录。

```sh
npm i clean-webpack-plugin -D
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ]
}
```

#### webpack.config.js

安装 `webpack-merge` 把配置文件合并

```sh
npm i webpack-merge -D
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig;
    return merge(baseConfig, config);
}
```

**8.配置启动命令**

修改 `package.json` 中的 `scripts` 配置：

```json
"scripts": {
    "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
    "build": "webpack --mode=production --config ./build/webpack.config.js"
}
```