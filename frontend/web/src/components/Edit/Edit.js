import React, { useState } from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import { Spin, message } from 'antd'
import equal from 'deep-equal'
import debounce from 'lodash.debounce'
import DesktopLayout from '../DesktopLayout'
import ReturnArrow from '../ReturnArrow'
import QuestionForm from '../QuestionForm'
import environment from '../../relay/environment'
import UpdateQuestionMutation from '../../relay/mutations/UpdateQuestionMutation'
import './Edit.css'

export default function Edit({ questionId }) {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query EditQuery($questionId: ID!) {
          question: node(id: $questionId) {
            id
            ... on Question {
              text
              answer
              choices
            }
          }
        }
      `}
      variables={{ questionId }}
      render={({error, props}) => {
        if (error) {
          return (
            <DesktopLayout>
              <div className='Edit-error'>
                <h1>{error.message}</h1>
                <pre>{error.stack}</pre>
              </div>
            </DesktopLayout>
          )
        } else  if (!props) {
          return <div className='Edit-loading'><Spin /></div>
        } else {
          return <EditForm {...props} />
        }
      }}
    />
  )
}

function EditForm({ question }) {
  const [formError, setFormError] = useState(null)

  function handleQuestionChange(newQuestion) {
    try {
      validate(newQuestion)
      setFormError(null)

      newQuestion.id = question.id
      updateQuestion(question, newQuestion)
    } catch (error) {
      setFormError(error)
    }
  }

  function validate({ text, choices }) {
    if (!text) {
      throw new Error('Question text is empty.')
      return false
    } else if (choices.map(Boolean).includes(false)) {
      throw new Error('Some choice(s) is(are) empty.')
      return false
    } else if (hasDuplicates(choices)) {
      throw new Error('Some choices are duplicates.')
      return false
    } else {
      return true
    }
  }

  return (
    <DesktopLayout>
      <ReturnArrow />
      <QuestionForm
        {...question}
        error={formError}
        onChange={handleQuestionChange}
      />
    </DesktopLayout>
  )
}

const updateQuestion = debounce(_updateQuestion, 500)
function _updateQuestion(question, newQuestion) {
  if (!equal(question, newQuestion)) {
    const hide = message.loading('Updating question...')

    UpdateQuestionMutation.commit(
      newQuestion,
      mutationError => {
        hide()
        if (mutationError) {
          message.error(mutationError.message, 6)
        } else {
          message.success('Question updated', 1)
        }
      }
    )
  }
}

function hasDuplicates(v) {
  for (let i = 0; i < v.length; i++) {
    const x = v[i]
    for (let j = 0; j < v.length; j++) {
      if (i === j)
        continue

      if (v[i] === v[j])
        return true
    }
  }

  return false
}
