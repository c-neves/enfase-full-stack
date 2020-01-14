const Question = require('../../model/Question')

// Hard code a default user for now.
module.exports = async function user({ id }) {
  return {
    id: 'MQ==',
    username: 'foo',
    questions: await Question.paginate({ first: 2147483646 })
  }
}
