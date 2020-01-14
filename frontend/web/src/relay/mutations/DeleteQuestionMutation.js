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

function commit(questionId) {
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
    }
  })
}

export default { commit }
