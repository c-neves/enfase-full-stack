module.exports = {
  todoList() {
    return {
      id: 'foo',
      todos: {
        edges: [{ node: { id: 0, text: 'Learn relay.', complete: false } }]
      },
      totalCount: 0,
      completedCount: 0
    }
  },

  foo: (...args) => {
    console.log(args)
    return 'bar'
  },

  createDeck: async ({ name }, { dynamo }) => {
    const hash_value = {S: name}
      const sort_value = {S: '2'}

      const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          hash: hash_value,
          sort: sort_value,
          value: {S: name}
        },

        ExpressionAttributeNames: {
          '#hash': 'hash',
          '#sort': 'sort'
        },

        ExpressionAttributeValues: {
          ':hash': hash_value,
          ':sort': sort_value
        },

        ConditionExpression: "#hash <> :hash AND #sort <> :sort",

        ReturnValues: 'ALL_OLD'
      }

      const item = await dynamo.putItem(params).promise()

    console.log(name)
    return true
  },

  getItem: async ({hash, sort}, {dynamo}) => {
    const getValues = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          hash: {S: hash},
          sort: {S: sort}
        }
      }

      const item = await dynamo.getItem(getValues).promise()

      return JSON.stringify(item, null, 2)
  }
}
