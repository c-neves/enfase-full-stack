import React, { useState } from 'react'
import { message } from 'antd'
import DesktopLayout from './DesktopLayout'
import ReturnArrow from './ReturnArrow'
import QuestionForm from './QuestionForm'
import CreateQuestionMutation from '../relay/mutations/CreateQuestionMutation'

export default function Create() {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleSubmit(question, resetForm) {
    console.log(question)
    const { text, answer, choices } = question

    if (!text) {
      setError(new Error('Question text is empty.'))
    } else if (choices.map(Boolean).includes(false)) {
      setError(new Error('Some choice(s) is(are) empty.'))
    } else if (hasDuplicates(choices)) {
      setError(new Error('Some choices are duplicates.'))
    } else {
      setLoading(true)
      setError(null)
      CreateQuestionMutation.commit(
        question,
        error => {
          if (error) {
            setError(error)
          } else {
            resetForm()
            message.success('Question created')
          }
          setLoading(false)
        }
      )
    }
  }

  return (
    <DesktopLayout>
      <ReturnArrow />
      <QuestionForm
        loading={loading}
        error={error}
        submitButton='Create'
        onSubmit={handleSubmit}
      />
    </DesktopLayout>
  )
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
