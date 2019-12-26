const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const glob = require('glob')

// eslint-disable-next-line import/no-dynamic-require
const defaultSettings = require(path.resolve(__dirname, './public/settings.ts'))

const settingsPathList = glob.sync(path.resolve(__dirname, './public/entrys/*/settings.ts'))
const defaultTemplate = path.resolve(__dirname, './public/index.ejs')

const pages = {}

settingsPathList.forEach(settingPath => {
  const settingsPath = path.resolve(__dirname, settingPath)

  // 读取配置文件
  // eslint-disable-next-line import/no-dynamic-require
  let settings = require(settingsPath)
  settings = { ...defaultSettings, ...settings }

  // 页面唯一name
  const name = settingsPath.split(path.sep).slice(-2)[0]

  let template = path.resolve(__dirname, path.dirname(settingsPath), 'index.ejs')
  if (!fs.existsSync(template)) {
    template = defaultTemplate
  }
  pages[name] = {
    ...settings,
    template
  }
})
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  pages,
  pluginOptions: {
    electronBuilder: {
      // 主入口文件
      mainProcessFile: 'src/main/index.ts',
      mainProcessWatch: ['src/main'],
      mainProcessArgs: [],
      builderOptions: {
        // 应用名称
        productName: '私塾钉钉',
        // 版权
        copyright: 'Copyright © 私塾国际学府',
        appId: 'com.chenfeng',
        compression: 'maximum',
        releaseInfo: {
          // 更新信息
          releaseNotes: '1. 修复退出群聊报错 <br> 2. 切换对话清空消息 <br> 3. 群聊查看群成员可发送消息'
        },
        publish: [
          {
            provider: 'generic',
            url: 'http://192.168.2.115:82/download/',
            channel: 'latest'
          }
        ],
        // 是否打包加密
        asar: true,
        // 项目打包生成的文件目录
        directories: {
          output: 'build'
        },
        // 是否静默安装
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        // window的icon头标
        win: {
          icon: 'public/sishu.png'
        },
        // mac的icon头标
        mac: {
          icon: 'public/favicon.ico'
        }
      }
    }
  },
  outputDir: 'build',
  chainWebpack: config => {
    config.resolve.alias.set('src', resolve('src/renderer')).set('static', resolve('static'))
  }
}
