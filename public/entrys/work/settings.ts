module.exports = {
  title: '工作页面',
  entry: 'src/renderer/win/workWin/index.ts',
  name: 'renderer',
  id: 'work',
  chunks: ['chunk-vendors', 'chunk-common', 'work'],
  filename: 'work.html'
}
