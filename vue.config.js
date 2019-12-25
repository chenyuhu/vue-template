const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  pages: {
    index: {
      // 文件的入口，一般为vue的main.js 文件
      entry: 'src/renderer/main.ts',
      // 模板的来源，可以是HTML文件，即你该项目的出口文件
      template: 'public/index.html',
      // filename，打包完成后作为什么文件输出
      filename: 'index.html',
      // 设置文件的主入口
      chunks: ['main', 'chunk-vendors', 'chunk-common', 'index'],
      // title: 当使用title选项时，template中的title标签需要是<title><%=htmlWebpackPlugin.optons.title %></title>
      title: '私塾国际'
    }
  },
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
        copyright: '',
        appId: 'com.sishu.hulkbuster',
        compression: 'maximum',
        releaseInfo: {
          // 更新信息
          releaseNotes: '1. 修复退出群聊报错 <br> 2. 切换对话清空消息 <br> 3. 群聊查看群成员可发送消息'
        },
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
