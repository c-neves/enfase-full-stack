const fs = require('fs')

const root = {}

fs.readdirSync(__dirname).forEach(file => {
  file = file.split('.')[0]
  if (file !== 'index')
    root[file] = require(`./${file}`)
})

module.exports = root
