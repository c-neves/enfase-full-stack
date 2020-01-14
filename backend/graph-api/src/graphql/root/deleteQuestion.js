const Question = require('../../model/Question')

module.exports = async function deleteQuestion({
  input: { id, clientMutationId }
}) {
  await Question.delete(id)
  return { id, clientMutationId }
}
