import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import Todo from './Todo'

function TodoList({ todoList: { todos, totalCount, completedCount } }) {
  return (
    <section>
      <input
        type='checkbox'
        checked={totalCount === completedCount}
        onChange={() => {}}
      />
      <ul>
        {todos.edges.map(edge => (
          <Todo
            key={edge.node.id}
            todo={edge.node}
          />
        ))}
      </ul>
    </section>
  )
}

export default createFragmentContainer(
  TodoList,
  {
    todoList: graphql`
      fragment TodoList_todoList on TodoList {
        id
        todos(
          first: 2147483647  # max GraphQLInt, to fetch all todos
        ) {
          edges {
            node {
              id
              ...Todo_todo
            }
          }
        }
        totalCount
        completedCount
      }
    `
  }
)
