const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      entry: 'src/renderer/main.ts',
      template: 'src/renderer/entry/index.html',
      filename: 'index.html',
      chunks: ['main', 'chunk-vendors', 'chunk-common', 'index'],
      title: '我的程序',
    },
  },
  pluginOptions: {
    electronBuilder: {
      // 输出的文件夹
      outputDir: 'build',
      //
      mainProcessFile: 'src/main/index.ts',
      electronBuilder: {
        productName: '晞格玛·云',
        copyright: '',
        appId: 'com.sishu.hulkbuster',
        releaseInfo: {
          releaseNotes: '',
        },
        asar: true,
        compression: 'maximum',
        publish: [
          {
            provider: 'generic',
            url: 'http://192.168.2.115:82/download/',
            channel: 'latest',
          },
        ],
        directories: {
          output: 'build',
        },
        files: ['dist/electron/**/*'],
        extraResources: ['static'],
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications',
            },
            {
              x: 130,
              y: 150,
              type: 'file',
            },
          ],
        },
        mac: {
          icon: 'build/icons/icon.icns',
        },
        win: {
          icon: 'public/favicon.ico',
        },
        linux: {
          icon: 'build/icons',
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
  productionSourceMap: process.env.NODE_ENV !== 'development',
  chainWebpack: (config) => {
    config.resolve.alias.set('src', resolve('src/renderer'))
  },
  configureWebpack: {
    plugins: [],
  },
  indexPath: 'src/renderer/entry',
}
