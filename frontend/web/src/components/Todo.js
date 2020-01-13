import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'

function Todo({ todo: { text, complete } }) {
  return (
    <li>
      <input type='checkbox' checked={complete} />
      <label>{text}</label>
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
        text
        complete
      }
    `
  }
)
