const path = require('path');
const babel = require('babel-core');

const RelativeToFilePath = require(path.relative(__dirname, './utils/RelativeToFilePath'));
const WriteToFille = require(path.relative(__dirname, './utils/WriteToFille'));

module.exports = async (ctx, next) => {

  const ReadeJavaScriptFilePath = RelativeToFilePath('./src/product/index.js');
  const WriteJavaScriptFilePath = RelativeToFilePath('./static/product/');
  let WriteJavaScriptToFille = WriteToFille.JavaScriptbyWebpack(
    ReadeJavaScriptFilePath, 
    WriteJavaScriptFilePath, 
    'index.js'
  );

  const ReadeCSSfilePath = RelativeToFilePath('./src/product/index.less');
  const WriteCSSfilePath = RelativeToFilePath('./static/product');
  const gulpLessfilePath = RelativeToFilePath('./src');
  let WriteCSStoFille = WriteToFille.CSS(
    ReadeCSSfilePath, 
    WriteCSSfilePath, 
    gulpLessfilePath
  );

  const ReadeHTMLfilePath = './src/product/index.xtpl';
  const WriteHTMLfilePath = RelativeToFilePath('./static/product/index.html');
  let WriteHTMLtoFille = WriteToFille.HTML(
    ReadeHTMLfilePath, 
    WriteHTMLfilePath
  );

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
