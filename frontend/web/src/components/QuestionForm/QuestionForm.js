import React, { useState } from 'react'
import { Input, Select, Button, Icon } from 'antd'
import DesktopLayout from '../DesktopLayout'
import './QuestionForm.css'

const { TextArea } = Input
const { Option } = Select
const ROMAN = 'ABCDEF'

export default function QuestionForm({
  text: initialText,
  answer: initialAnswer,
  choices: initialChoices,
  onChange,
  onSubmit,
  submitButton,
  loading,
  error
}) {
  const [text, _setText] = useState(initialText || '')
  const [answer, _setAnswer] = useState(initialAnswer || 0)
  const [choices, setChoices] = useState(initialChoices || ['', ''])
  onChange = typeof onChange === 'function' ? onChange : () => {}
  onSubmit = typeof onSubmit === 'function' ? onSubmit : () => {}

  function setText(value) {
    _setText(value)
    onChange({ text: value, answer, choices })
  }

  function setAnswer(value) {
    _setAnswer(value)
    onChange({ text, answer: value, choices })
  }

  function handleAddChoice() {
    setChoices(old => {
      const newChoices = [...old, '']
      onChange({ text, answer, choices: newChoices })
      return newChoices
    })
  }

  function handleRemoveChoice(index) {
    setChoices(old => {
      if (answer === old.length - 1) {
        setAnswer(old.length - 2)
      }
      const newChoices = [...old]
      newChoices.splice(index, 1)
      onChange({ text, answer, choices: newChoices })
      return newChoices
    })
  }

  function handleChoiceChange(index, value) {
    setChoices(old => {
      const newChoices = [...old]
      newChoices[index] = value
      onChange({ text, answer, choices: newChoices })
      return newChoices
    })
  }

  function resetForm() {
    setText('')
    setAnswer(0)
    setChoices(['', ''])
  }

  return (
    <form className='QuestionForm'>
      <div className='QuestionForm-field'>
        <div className='QuestionForm-label'>
          <RequiredRedStar />
          Question Text:
        </div>
        <TextArea
          autoSize={{ minRows: 2, maxRows: 6 }}
          value={text}
          onChange={event => setText(event.target.value)}
        />
      </div>
      <div className='QuestionForm-field'>
        <div className='QuestionForm-label'>
          <RequiredRedStar />
          Answer:
        </div>
        <Select
          value={answer}
          onChange={value => setAnswer(Number(value))}
        >
          {choices.map((_, index) => (
            <Option key={index} value={index}>
              Choice {ROMAN[index]}
            </Option>
          ))}
        </Select>
      </div>
      {choices.map((choice, index) => (
        <div key={index} className='QuestionForm-field'>
          <div className='QuestionForm-label'>
            {choices.length > 2 && (
              <Button type='link' onClick={() => handleRemoveChoice(index)}>
                remove
              </Button>
            )}
            <RequiredRedStar />
            Choice {ROMAN[index]}:
          </div>
          <TextArea
            value={choice}
            onChange={event => handleChoiceChange(index, event.target.value)}
          />
        </div>
      ))}
      <div className='QuestionForm-field'>
        <div />
        {choices.length < 6 && (
          <Button onClick={handleAddChoice}>
            <Icon type='plus' />
            Add Choice
          </Button>
        )}
      </div>
      <div className='QuestionForm-field'>
        <div />
        {error && (
          <span style={{ color: 'red' }}>{error.message}</span>
        )}
      </div>
      <div className='QuestionForm-field'>
        <div />
        {submitButton && (
          <Button
            type='primary'
            loading={loading}
            onClick={() => onSubmit({ text, answer, choices }, resetForm)}
          >
            {submitButton}
          </Button>
        )}
      </div>
    </form>
  )
}

const RequiredRedStar = () => (
  <span style={{ color: 'red' }}>
    *{' '}
  </span>
)
