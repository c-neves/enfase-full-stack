const chokidar = require('chokidar')
const spawn = require('execa')

let process = spawn(
  'yarn',
  ['relay'],
  { stdio: 'inherit' }
)

chokidar.watch(['src', 'yarn.lock']).on('all', () => {
  process.kill('SIGKILL')
  process = spawn(
    'yarn',
    ['relay'],
    { stdio: 'inherit' }
  )
})
