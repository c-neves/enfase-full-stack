import { graphql, commitMutation } from 'react-relay'

const mutation = graphql`
  mutation ChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
    changeTodoStatus(input: $input) {
      todo {
        id
        complete
      }
    }
  }
`

function getOptimisticResponse({ id, complete }) {
  return {
    changeTodoStatus: {
      todo: {
        id,
        complete
      }
    }
  }
}

function commit(environment, { id, complete }) {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: { id, complete }
    },
    optimisticResponse: getOptimisticResponse({ id, complete })
  })
}

export default { commit }
