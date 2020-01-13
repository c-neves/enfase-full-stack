import React from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import TodoList from '../TodoList'
import environment from '../../relay/environment'
// import { Button } from 'antd'
// <Button type="primary">Button</Button>
// import './App.css'

function App() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query AppQuery {
          todoList {
            id
            ...TodoList_todoList
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>Error!</div>
        } else if (!props) {
          return <div>Loading...</div>
        } else {
          return <div>
            <div>Todo list id: {props.todoList.id}</div>
            <TodoList todoList={props.todoList} />
          </div>
        }
      }}
    />
  )
}

export default App
