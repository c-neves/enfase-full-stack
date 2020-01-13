import React from 'react'
import { Router, Link } from '@reach/router'
import QuestionList from '../QuestionList'

const Create = () => <div>Create</div>
const Edit = ({ questionId }) => <div>Edit #{questionId}</div>
const Preview = ({ questionId }) => <div>Preview #{questionId}</div>
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
