import { commitMutation, graphql } from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import environment from '../environment'

const mutation = graphql`
  mutation CreateQuestionMutation($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      question {
        __typename
        cursor
        node {
          id
          text
          answer
          choices
        }
      }
    }
  }
`

let tempId = 0

function commit({ text, answer, choices }, callback) {
  const input = {
    text,
    answer,
    choices,
    clientMutationId: `${tempId++}`
  }

  return commitMutation(environment, {
    mutation,
    variables: { input },
    updater: callback // Call callback when mutation is done.
  })
}

export default { commit }
