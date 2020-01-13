function encode(binary) {
  return (Buffer.from(String(binary))).toString('base64')
}

function decode(ascii) {
  return (Buffer.from(ascii, 'base64')).toString('ascii')
}

module.exports = { encode, decode }
