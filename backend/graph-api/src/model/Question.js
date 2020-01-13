const database = require('../database')
const base64 = require('../util/base64')

module.exports = class Question {
  static async get(id) {
    const rawId = base64.decode(id)

    let result = await database.query({
      text: 'SELECT _text AS text, answer FROM question WHERE id = $1',
      values: [rawId]
    })

    if (result.rowCount !== 1) {
      return null
    }

    // result.rows[0] === { text: 'foo?', answer: 2 }
    const question = result.rows[0]
    question.id = id

    result = await database.query({
      text: 'SELECT _text AS text FROM choice WHERE question_id = $1 ORDER BY index',
      values: [rawId]
    })

    if (result.rowCount < 2) {
      throw new Error(
        'Corrupted database data. ' +
        `Question with id = ${rawId} has less than 2 choices.`
      )
    }

    question.choices = result.rows.map(({ text }) => text)

    return question
  }

  static async paginate({ first, after, last, before }) {
    // SOURCE: https://github.com/graphql/graphql-relay-js/issues/94#issuecomment-232410564

    // Make sure first and last args are treated as
    // mutually exclusive to avoid making a mess.
    if (first && last) {
      throw new Error('Both `first` and `last` arguments can\'t both be set.')
    }

    // 1. Start from the greedy query: SELECT * FROM table
    const query = 'SELECT id FROM question'
    const where = []
    const orderBy = []
    const values = []

    // 2. If the after argument is provided, add id < parsed_cursor to the WHERE clause
    if (after) {
      where.push(`id < $${values.length + 1}`)
      values.push(base64.decode(after))
    }

    // 3. If the before argument is provided, add id > parsed_cursor to the WHERE clause
    if (before) {
      where.push(`id > $${values.length + 1}`)
      values.push(base64.decode(before))
    }

    // 4. If the first argument is provided, add ORDER BY id DESC LIMIT first+1 to the query
    if (first) {
      orderBy.push(`ORDER BY id DESC LIMIT $${values.length + 1}+1`)
      values.push(first)
    }

    // 5. If the last argument is provided, add ORDER BY id ASC LIMIT last+1 to the query
    if (last) {
      orderBy.push(`ORDER BY id ASC LIMIT $${values.length + 1}+1`)
      values.push(last)
    }

    let { rows } = await database.query({
      text: [
        query,
        where.length > 0 ? `WHERE ${where.join(' AND ')}` : '',
        orderBy.join(' ')
      ].join(' '),
      values
    })

    // 6. If the last argument is provided, I reverse the order of the results
    if (last) {
      rows = rows.reverse()
    }

    // 7. If the first argument is provided then I set hasPreviousPage: false (see spec for a description of this behavior).
    const pageInfo = {}
    if (first) {
        pageInfo.hasPreviousPage = false
    }

    // 8. If no less than first+1 results are returned, I set hasNextPage: true, otherwise I set it to false.
    if (first) {
      pageInfo.hasNextPage = rows.length === first + 1
      if (pageInfo.hasNextPage) {
        rows.pop()
        pageInfo.endCursor = base64.encode(rows[rows.length - 1].id)
      }
    }

    // 9. If the last argument is provided then I set hasNextPage: false (see spec for a description of this behavior).
    if (last) {
      pageInfo.hasNextPage = false
    }

    // 10. If no less last+1 results are returned, I set hasPreviousPage: true, otherwise I set it to false.
    if (last) {
      pageInfo.hasPreviousPage = rows.length === last + 1
      if (pageInfo.hasPreviousPage) {
        rows.pop()
        pageInfo.startCursor = base64.encode(rows[rows.length - 1].id)
      }
    }

    // Mask ids then fetch each question from the database.
    rows = rows.map(({ id }) => base64.encode(id))
    const questions = await Promise.all(rows.map(Question.get))

    const edges = questions.map(node => ({ node, cursor: node.id }))

    return { pageInfo, edges }
  }
}
