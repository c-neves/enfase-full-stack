import { commitMutation, graphql } from 'react-relay'
import environment from '../environment'

const mutation = graphql`
  mutation UpdateQuestionMutation($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      question {
        id
        text
        answer
        choices
      }
    }
  }
`

function getOptimisticResponse(question) {
  return { updateQuestion: { question } }
}

function commit(input, callback) {
  return commitMutation(environment, {
    mutation,
    variables: { input },
    optimisticResponse: getOptimisticResponse(input),
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
