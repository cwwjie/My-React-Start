var path = require("path");
var webpack = require("webpack");
module.exports = {
	entry: {
		app:['whatwg-fetch',"./src/index.js"]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		// publicPath: "/assets/", // 这个是输出的地址，上面的文件不会用到，但是下面的文件会用到对的！
		filename: "bundle.js",
		chunkFilename: '[name].[chunkhash:5].chunk.js'
	},
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
		}),
		new webpack.optimize.CommonsChunkPlugin('common.js')// 这个要抽出
	],
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
	}
};