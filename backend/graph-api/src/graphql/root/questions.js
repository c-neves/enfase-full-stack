const Question = require('../../model/Question')

module.exports = async function questions({ first, after, last, before }) {
  try {
    return await Question.paginate({ first, after, last, before })
  } catch (error) {
    console.error(error)
    throw error
  }
}
