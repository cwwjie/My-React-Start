var path = require("path");
module.exports = {
	entry: {
		app: ['whatwg-fetch',"./src/index.js"]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		publicPath: "/assets/",
		filename: "bundle.js" //最终打包生产的文件名
		// 添加 chunkFilename 这个据说是按需加载的东西
		// name 是在代码里为创建的 chunk 指定的名字，如果代码中没指定则 webpack 默认分配 id 作为 name。
		// chunkhash 是文件的 hash 码，这里只使用前五位。
		// chunkFilename: '[name].[chunkhash:5].chunk.js'
		// 这里因为有热加载所以不需要用到
	},
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
	}//,
	// plugins: [
	// 	new webpack.optimize.CommonsChunkPlugin('common.js')
	// ]
	// 这里因为有热加载所以也不需要用到
};
