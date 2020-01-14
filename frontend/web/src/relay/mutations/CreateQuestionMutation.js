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
