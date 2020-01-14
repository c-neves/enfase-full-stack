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

function commit(input) {
  console.log('input', input)
  return commitMutation(environment, {
    mutation,
    variables: { input },
    optimisticResponse: getOptimisticResponse(input)
  })
}

export default { commit }
