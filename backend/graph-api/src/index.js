const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser-graphql')
const { graphql } = require('graphql')
const { schema, root } = require('./graphql')
const database = require('./database')

const port = 4000
const host = '0.0.0.0'
const app = express()

app.use(cors())

app.use(bodyParser.graphql())

app.get('/', async (req, res) => {
  const _res = await database.query('SELECT * from choice')
  res.send(_res)
})

app.post('/', async (req, res) => {
  try {
    const response = await graphql({
      schema,
      rootValue: root,
      source: req.body.query,
      variableValues: req.body.variables,
      contextValue: { database }
    })

    res.status(200).send(response)
  } catch (error) {
    res.status(error.statusCode || 500).send({
      message: error.message || 'Internal Server Error',
      stack: error.stack.split('\n')
    })
  }
})

app.listen(port, host, () => (
  console.log(`graph api listening on port ${port}...`)
))
