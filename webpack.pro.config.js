var path = require("path");
var webpack = require('webpack');

var isProduction = true;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin({
    filename: 'styles.css'
});

module.exports = {
    context: sourcePath,
    entry: {
        main: './index.ts',
        vendor: [
          'react',
          'react-dom',
          'react-router',
          'mobx',
          'mobx-react',
          'mobx-react-router'
        ]
    },
    output: {
        path: outPath,
        filename: 'bundle.js',
        publicPath: './' //最终打包生产的文件名
        // 添加 chunkFilename 这个据说是按需加载的东西
        // name 是在代码里为创建的 chunk 指定的名字，如果代码中没指定则 webpack 默认分配 id 作为 name。
        // chunkhash 是文件的 hash 码，这里只使用前五位。
        // chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        // Fix webpack's default behavior to not load packages with jsnext:main module
        // (jsnext:main directs not usually distributable es6 format, but es6 sources)
        mainFields: ['module', 'browser', 'main']
    },
    module: {
        loaders: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                use: [
                    'react-hot-loader/webpack',
                    'awesome-typescript-loader'
                ]
            },
            // css 
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                sourceMap: !isProduction,
                                importLoaders: 1,
                                localIdentName: '[local]__[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-import')({ addDependencyTo: webpack }),
                                    require('postcss-url')(),
                                    require('postcss-cssnext')(),
                                    require('postcss-reporter')(),
                                    require('postcss-browser-reporter')({ disabled: isProduction }),
                                ]
                            }
                        }
                    ]
                })
            },
            // less
            {
                test: /\.less$/,
                use: extractLess.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            // static assets 
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.png$/, use: 'url-loader?limit=10000' },
            { test: /\.jpg$/, use: 'file-loader' },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                context: sourcePath
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js',
            minChunks: Infinity
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        extractLess,
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            template: 'assets/index.html'
        })
    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        stats: {
            warnings: false
        },
    },
    node: {
        // workaround for webpack-dev-server issue 
        // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
        fs: 'empty',
        net: 'empty'
    }
};