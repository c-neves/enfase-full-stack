import React, { useState } from 'react'
import CreateQuestionMutation from '../relay/mutations/CreateQuestionMutation'

const ROMAN = 'ABCDEF'

export default function Create() {
  const [text, setText] = useState('')
  const [answer, setAnswer] = useState(0)
  const [choices, setChoices] = useState(['', ''])

  function handleAddChoice() {
    setChoices(old => [...old, ''])
  }

  function handleRemoveChoice(index) {
    setChoices(old => {
      if (answer === old.length - 1) {
        setAnswer(old.length - 2)
      }
      const _new = [...old]
      _new.splice(index, 1)
      return _new
    })
  }

  function handleChoiceChange(index, value) {
    setChoices(old => {
      const _new = [...old]
      _new[index] = value
      return _new
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!text) {
      console.error('Question text is empty.')
    } else if (choices.map(Boolean).includes(false)) {
      console.error('Some choice(s) is(are) empty.')
    } else if (hasDuplicates(choices)) {
      console.error('Some choices are duplicates.')
    } else {
      CreateQuestionMutation.commit({ text, answer, choices })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <textarea
          value={text}
          onChange={event => setText(event.target.value)}
          placeholder='Question text...'
        />
      </div>
      <div>
        Answer:
        <select
          value={answer}
          onChange={event => setAnswer(Number(event.target.value))}
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
      <div>
        <button type='submit'>Create</button>
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
