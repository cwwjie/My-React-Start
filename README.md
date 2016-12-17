# My-React-Start
我的React启动架

# 怎么开始？安装写啥？
	- 先把文件夹安排好 （OK）
	  - 我需要是啥？
	  - 单页面应用，redux+react 路由
	  - 开发环境，生产环境，
	  - 应该看着那个 8000+ 的来。
	- 搭建开发环境
	  - webpack-dev-server
	    - 完成小部分、哎呀哎呀。
	    - webpack-dev-server --content-base build --inline --hot --open
	    - 完全可以不起 node.js 服务器
      
# webpack 怎么优化
	1.生产环境
		默认情况下，React包括许多有用的警告。 这些警告在开发中非常有用。 但是，他们使React更大更慢，所以你应该确保在部署应用程序时使用生产版本。
		// Webpack 中的 "resolve.alias" 也就是请求重定向。
		// var NODE_DIR = path.resolve(__dirname, 'node_modules');
		// resolve: {
		// 	alias: {
		// 		'react': path.join(NODE_DIR, 'react/dist/react.min.js'),
		// 		'react-dom': path.join(NODE_DIR, 'react-dom/dist/react-dom.min.js')
		// 	}
		// }
		- 上面这个方法不是最优选。
		- 官方的建议做法是。
		plugins: [
			new webpack.DefinePlugin({
				'process.env':{
					'NODE_ENV': JSON.stringify('production')
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress:{
					warnings: true
				}
			})
		]
		- 但是第一个做法可以 用到其他的库上面去。
	2.提取第三方库
		改变库的调用方式，一个包通常会有一个入口文件，我们将所有的模块都放在这个入口文件中，以便其他开发者调用。
		但是如果仅仅只用了一个包中很少一个模块，那么从入口文件调用就会导致增加了很多多余的模块。
		所以 React Router 应该这么调用：
		import Route from 'react-router/lib/Route';
		import IndexRoute from 'react-router/lib/IndexRoute';
		不应该这么调用：
		import { Route, IndexRoute } from 'react-router/lib/Route';
	3.代码压缩
	4.代码分割
		- 官方有个例子配合 code split 配合 react router
		"https://github.com/ReactTraining/react-router/tree/master/examples/huge-apps"
	5.最后加上 H5 的 localStorage
	6.服务端渲染 (Universal 渲染)
		- “同构” 服务端与客户端使用一套代码进行渲染的技术
		  "优势"
		  1.与传统服务端渲染，减少了网络请求，提高了页面间切换的速度，可以看到页面之间的切换都是瞬间完成的。
		  2.与传统的SPA，提升了首屏加载速度，无须等待庞大的 Javascript 脚本加载完成后进行渲染，因此也无须使用欢迎界面了。
		  3.与传统服务端渲染，前后端均为 JavaScript

# webpack 怎么配置
	没有配置的时候是 "webpack ./entry.js bundle.js" 这样打包
	这个是使用了模块 "webpack ./entry.js bundle.js --module-bind 'css=style!css'"
	module.exports = {
	    entry: "./entry.js",
	    output: {
	        path: __dirname,
	        publicPath: "/assets/",
	        filename: "bundle.js"
	    },
	    module: {
	        loaders: [
	            { test: /\.css$/, loader: "style!css" }
	        ]
	    }
	};
	path: 打包文件存放的绝对路径
	publicPath: 网站运行时的访问路径
	filename: 打包后的文件名
	1.看熟练官方文档
	- 首先要 react 啦
		npm install react react-dom --save-dev
	- 之后 webpack 要装 loaders  /* http://webpack.github.io/docs/usage.html */
		官网的仅仅是ES6的转换，
	    "babel-core": "^6.18.2",
	    "babel-loader": "^6.2.8",
	    "babel-preset-es2015": "^6.18.0"
	- 还需要告诉 babel 要使用到JSX的语法
		npm install babel-preset-react babel-preset-es2015 --save-dev
		module: {
			loaders: [
			  {
			    test: /\.jsx?$/,
			    exclude: /(node_modules|bower_components)/,
			    loader: 'babel',
			    query: {
			      presets: ['react', 'es2015']
			    }
			  }
			]
		},

