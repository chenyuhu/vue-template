'use strict'

process.env.NODE_ENV = 'production'

const del = require('del')

const  clean = () => {
  del.sync(['build/*'])
  process.exit()
}

if (process.env.BUILD_TARGET === 'clean') {
  clean()
}
