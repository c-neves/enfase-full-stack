import React, { useState } from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import environment from '../relay/environment'
// import { navigate } from '@reach/router'
import UpdateQuestionMutation from '../relay/mutations/UpdateQuestionMutation'

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
          return <div>Error!</div>
        } else  if (!props) {
          return <div>Loading...</div>
        } else {
          return <EditForm {...props.question} />
        }
      }}
    />
  )
}

const ROMAN = 'ABCDEF'

function EditForm({ id, text, answer, choices }) {
  // const [text, setText] = useState('')
  // const [answer, setAnswer] = useState(0)
  // const [choices, setChoices] = useState(['', ''])

  function validate() {
    if (!text) {
      console.error('Question text is empty.')
      return false
    } else if (choices.map(Boolean).includes(false)) {
      console.error('Some choice(s) is(are) empty.')
      return false
    } else if (hasDuplicates(choices)) {
      console.error('Some choices are duplicates.')
      return false
    } else {
      return true
    }
  }

  function handleTextChange(newText) {
    if (validate()) {
      UpdateQuestionMutation.commit({
        id,
        text: newText,
        answer,
        choices
      })
    }
  }

  function handleAnswerChange(newAnswer) {
    if (validate()) {
      UpdateQuestionMutation.commit({
        id,
        text,
        answer: newAnswer,
        choices
      })
    }
  }

  function handleAddChoice() {
    if (validate()) {
      UpdateQuestionMutation.commit({
        id,
        text,
        answer,
        choices: [...choices, '']
      })
    }
  }

  function handleRemoveChoice(index) {
    if (!validate()) {
      return
    }
    let newAnswer = answer
    if (answer === choices.length - 1) {
      newAnswer = choices.length - 2
    }
    const newChoices = [...choices]
    newChoices.splice(index, 1)
    UpdateQuestionMutation.commit({
      id,
      text,
      answer: newAnswer,
      choices: newChoices
    })
  }

  function handleChoiceChange(index, value) {
    if (!validate()) {
      return
    }
    const newChoices = [...choices]
    newChoices[index] = value
    UpdateQuestionMutation.commit({ id, text, answer, choices: newChoices })
  }

  return (
    <form onSubmit={event => event.preventDefault()}>
      <div>
        <textarea
          value={text}
          onChange={event => handleTextChange(event.target.value)}
          placeholder='Question text...'
        />
      </div>
      <div>
        Answer:
        <select
          value={answer}
          onChange={event => handleAnswerChange(Number(event.target.value))}
        >
          {choices.map((c, i) => (
            <option key={i} value={i}>
              {ROMAN[i]}
            </option>
          ))}
        </select>
      </div>
      {choices.map((choice, index) => (
        <div key={index}>
          <textarea
            value={choice}
            onChange={event => handleChoiceChange(index, event.target.value)}
            placeholder={`Choice ${ROMAN[index]}`}
          />
          {choices.length > 2 && (
            <button type='button' onClick={() => handleRemoveChoice(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <div>
        {choices.length < 6 && (
          <button type='button' onClick={handleAddChoice}>
            Add Choice
          </button>
        )}
      </div>
    </form>
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
