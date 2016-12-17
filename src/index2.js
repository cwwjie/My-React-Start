// 经典的commonjs同步语法如下
var a = require("./a.js");
var b = require("./b.js");


/* 第一个参数 是预加载懒执行
 * require.ensure的第一个参数传了['./c.js']，
 * 执行到这里的时候 .c/js 会被浏览器下载下来
 * 但是并不会执行 .c/js 模块中的代码
 */ 
// require.ensure(["./c.js"], function(require) {
//     var d = require("./d.js");
//     /*
//      * 这里的 c.js d.js 都打包到了 1.bundle.js 里面，
//      * 但是 d.js 异步加载进来了
//      */
// });

// 这样就分开执行
require(['./c.js'], function(list){
});
require(['./d.js'], function(list){
});
require(['./d.js'], function(list){
});