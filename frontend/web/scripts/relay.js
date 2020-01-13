const chokidar = require('chokidar')
const spawn = require('execa')

const args = [
  '--src', 'src',
  '--schema', 'src/relay/schema.graphql'
]

let process = spawn(
  'relay-compiler',
  args,
  { stdio: 'inherit' }
)

chokidar.watch(['src']).on('all', () => {
  process.kill('SIGKILL')
  process = spawn(
    'relay-compiler',
    args,
    { stdio: 'inherit' }
  )
})
