const del = require('del')

const clean = () => {
  del.sync(['build/*'])
  process.exit()
}
const buildClean = () => {
  del.sync(['dist_build/*', 'build/*'])
  process.exit()
}

if (process.env.BUILD_TARGET === 'clean') {
  clean()
}
if (process.env.BUILD_TARGET === 'buildClean') {
  buildClean()
}
