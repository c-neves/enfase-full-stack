import React from 'react'
import { Router } from '@reach/router'
import QuestionList from './QuestionList'
import Create from './Create'
import Edit from './Edit'
import Preview from './Preview'

const NotFound = ({ location }) => (
  <div>Route <code>{location.pathname}</code> not found</div>
)

export default function App() {
  return (
    <Router>
      <QuestionList path='/' />
      <Create path='/create' />
      <Edit path='/edit/:questionId' />
      <Preview path='/preview/:questionId' />
      <NotFound default />
    </Router>
  )
}
