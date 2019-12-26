module.exports = {
  title: '主页面',
  entry: 'src/renderer/main.ts',
  name: 'renderer',
  id: 'main',
  chunks: ['main', 'chunk-vendors', 'chunk-common', 'index'],
  filename: 'index.html'
}
