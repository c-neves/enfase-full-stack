const Question = require('../../model/Question')

// The only node we have are Question nodes.
// Select the requested question by id from the database.
module.exports = async function node({ id }) {
  const question = await Question.get(id)

  // Tell GraphQL this node's type.
  if (question !== null) {
    question.__typename = 'Question'
  }

  return question
}
