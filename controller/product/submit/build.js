const path = require('path');
const babel = require('babel-core');

const RelativeToFilePath = require(path.relative(__dirname, './utils/RelativeToFilePath'));
const WriteToFille = require(path.relative(__dirname, './utils/WriteToFille'));

module.exports = async function renderProductSubmit(next) {

  const ReadeJavaScriptFilePath = RelativeToFilePath('./src/product/submit/index.js');
  const WriteJavaScriptFilePath = RelativeToFilePath('./build/product/submit/');
  let WriteJavaScriptToFille = WriteToFille.JavaScriptbyWebpack(
    ReadeJavaScriptFilePath, 
    WriteJavaScriptFilePath, 
    'index.js',
    true // 证明是生产环境
  );

  const ReadeCSSfilePath = RelativeToFilePath('./src/product/submit/index.less');
  const WriteCSSfilePath = RelativeToFilePath('./build/product/submit');
  const gulpLessfilePath = RelativeToFilePath('./src');
  let WriteCSStoFille = WriteToFille.CSS(
    ReadeCSSfilePath, 
    WriteCSSfilePath, 
    gulpLessfilePath
  );

  const ReadeHTMLfilePath = './src/product/submit/index.xtpl';
  const WriteHTMLfilePath = RelativeToFilePath('./build/product/submit/index.html');
  let WriteHTMLtoFille = WriteToFille.HTML(
    ReadeHTMLfilePath, 
    WriteHTMLfilePath
  );

  await Promise.all([
    WriteJavaScriptToFille,
    WriteCSStoFille,
    WriteHTMLtoFille
  ]).then((val) => {
    // console.log('渲染主页的产品提交成功!');
  }, (error) => {
    console.error(`渲染 主页的产品提交 出错! 原因: ${error}`);
  });
}
