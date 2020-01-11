const chokidar = require('chokidar')
const spawn = require('execa')

let process = spawn(
  'node',
  ['src/index.js'],
  { stdio: 'inherit' }
)

chokidar.watch(['src', 'yarn.lock']).on('all', () => {
  process.kill('SIGKILL')
  process = spawn(
    'node',
    ['src/index.js'],
    { stdio: 'inherit' }
  )
})
