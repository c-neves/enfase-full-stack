import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../environment'

const mutation = graphql`
  mutation DeleteQuestionMutation($input: DeleteQuestionInput!) {
    deleteQuestion(input: $input) {
      id
    }
  }
`

function commit(questionId, callback) {
  const input = {
    id: questionId
  }

  return commitMutation(environment, {
    mutation,
    variables: { input },
    updater: store => {
      const payload = store.getRootField('deleteQuestion')
      const deletedQuestionId = payload.getValue('id')
      store.delete(deletedQuestionId)
    },
    optimisticUpdater: store => {
      store.delete(questionId)
    },
    onCompleted: (response, errors) => {
      if (errors instanceof Array && errors.length > 0) {
        callback(errors[0])
      } else {
        callback(null)
      }
    }
  })
}

// Delay the mutation to simulate a more real-world scenario.
function delayedCommit(...args) {
  setTimeout(() => commit(...args), 1500)
}

export default { commit: delayedCommit }
