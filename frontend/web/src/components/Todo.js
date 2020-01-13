import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import ChangeTodoStatusMutation from '../relay/ChangeTodoStatusMutation'

function Todo({ todo: { id, text, complete }, relay }) {
  function handleChange(event) {
    ChangeTodoStatusMutation.commit(
      relay.environment,
      { id, complete: event.target.checked }
    )
  }

  return (
    <li>
      <input
        type='checkbox'
        checked={complete}
        onChange={handleChange}
      />
      <label>{text} ({id})</label>
    </li>
  )
}

export default createFragmentContainer(
  Todo,
  // Each key specified in this object will correspond to a prop available
  // to the component
  {
    todo: graphql`
      # As a convention, we name the fragment as '<ComponentFileName>_<propName>'
      fragment Todo_todo on Todo {
        id
        text
        complete
      }
    `
  }
)
