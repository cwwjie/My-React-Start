const path = require('path');
const babel = require('babel-core');

const RelativeToFilePath = require(path.relative(__dirname, './method/RelativeToFilePath'));
const WriteToFille = require(path.relative(__dirname, './method/WriteToFille'));

module.exports = async (ctx, next) => {

  const ReadeJavaScriptFilePath = RelativeToFilePath('./src/index.js');
  const WriteJavaScriptFilePath = RelativeToFilePath('./static/');
  let WriteJavaScriptToFille = WriteToFille.JavaScriptbyWebpack(ReadeJavaScriptFilePath, WriteJavaScriptFilePath, 'index.js');

  const ReadeCSSfilePath = RelativeToFilePath('./src/index.less');
  const WriteCSSfilePath = RelativeToFilePath('./static/index.css');
  let WriteCSStoFille = WriteToFille.CSS(ReadeCSSfilePath, WriteCSSfilePath);

  const ReadeHTMLfilePath = './src/index.xtpl';
  const WriteHTMLfilePath = RelativeToFilePath('./static/index.html');
  let WriteHTMLtoFille = WriteToFille.HTML(ReadeHTMLfilePath, WriteHTMLfilePath);

  await Promise.all([
    WriteJavaScriptToFille,
    WriteCSStoFille,
    WriteHTMLtoFille
  ]).then((val) => {
    ctx.body = val[2];
  }, (error) => {
    ctx.body = error;
  });
}
