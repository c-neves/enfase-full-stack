const Question = require('../../model/Question')

module.exports = async function updateQuestion({
  input: { id, text, answer, choices, clientMutationId }
}) {
  const question = await Question.update({ id, text, answer, choices })
  return {
    question,
    clientMutationId
  }
}
