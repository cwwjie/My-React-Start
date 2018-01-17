const fs = require('fs');
const path = require('path');

const fsExtra = require('fs-extra');
const renderHome = require('./controller/build');

let main = {
  URLbase: 'http://112.74.92.97:8080',
  URLversion: 'http://112.74.92.97:8080/dvtweb',
  URLvillage: 'http://112.74.92.97:8080/dvtreserve',

  urlConfig() {
    return Buffer.from(`var appConfig = { urlBase: "${this.URLbase}", version: "${this.URLversion}", village: "${this.URLvillage}" };`);
  },

  async init() {
    // 清空 build 文件夹
    await this.emptyDirBy(`${__dirname}\\build`);
    
    // 创建 dist 文件夹
    fs.mkdirSync(`${__dirname}\\build`);

    // 复制
    // await this.copyDirBy(`${__dirname}\\static\\dist`, `${__dirname}\\build\\dist`);

    // 渲染 appConfig 配置文件
    // await this.renderConfigJSFile();

    // 渲染 index 首页
    // await renderHome();
  },

  async renderConfigJSFile() {
    try {
      await fsExtra.outputFile(`${__dirname}\\build\\dist\\js\\config.js`, this.urlConfig())
    } catch (err) {
      console.error(`渲染 config.js 配置文件出错! 原因: ${err}`)
    }
  },

  async copyDirBy(prevFile, targetFile) {
    try {
      await fsExtra.copy(prevFile, targetFile)
    } catch (err) {
      console.error(`复制 ${prevFile} 文件出错! 原因: ${err}`)
    }
  },

  async emptyDirBy(fileUrl) {
    try {
      await fsExtra.remove(fileUrl);
    } catch (err) {
      console.error(`删除 ${fileUrl} 文件出错! 原因: ${err}`)
    }
  }
}

main.init();
