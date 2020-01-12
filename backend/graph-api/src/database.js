const { Pool } = require('pg')

// Pools use environment variables for connection information.
const pool = new Pool()

module.exports = pool
