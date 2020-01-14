const Question = require('../../model/Question')

module.exports = async function createQuestion({
  input: { text, answer, choices, clientMutationId }
}) {
  const question = await Question.insert({ text, answer, choices })

  return {
    question: {
      cursor: question.id,
      node: question
    },
    clientMutationId
  }
}
