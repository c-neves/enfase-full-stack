import React, { useState } from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import { Spin, Radio, Button } from 'antd'
import DesktopLayout from '../DesktopLayout'
import ReturnArrow from '../ReturnArrow'
import environment from '../../relay/environment'
import './Preview.css'

const ROMAN = 'ABCDEF'

export default function Preview({ questionId }) {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query PreviewQuery($questionId: ID!) {
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
      render={({ error, props }) => {
        if (error) {
          return (
            <DesktopLayout>
              <ReturnArrow />
              <div className='Preview-error'>
                <h1>{error.message}</h1>
                <pre>{error.stack}</pre>
              </div>
            </DesktopLayout>
          )
        } else  if (!props) {
          return (
            <div className='Preview-loading'>
              <ReturnArrow />
              <Spin />
            </div>
          )
        } else {
          return (
            <DesktopLayout>
              <ReturnArrow />
              <QuestionPreview {...props.question} />
            </DesktopLayout>
          )
        }
      }}
    />
  )
}

function QuestionPreview({ text, answer, choices }) {
  const [selectedAnswer, setSelectedAnswer] = useState(-1)
  const [showAnswer, setShowAnswer] = useState(false)

  const radioStyle = {
    display: 'block',
    height: '2em',
    lineHeight: '2em',
    fontSize: '1.2em'
  }

  function handleChange(event) {
    setSelectedAnswer(event.target.value)
  }

  return (
    <div className='QuestionPreview'>
      <div className='QuestionPreview-field'>
        <h2>{text}</h2>
      </div>
      <div className='QuestionPreview-field'>
        <Radio.Group value={selectedAnswer} onChange={handleChange}>
          {choices.map((choiceText, index) => (
            <Radio style={radioStyle} value={index}>
              {ROMAN[index]}. <strong>{choiceText}</strong>
            </Radio>
          ))}
        </Radio.Group>
      </div>
      {selectedAnswer !== -1 && !showAnswer && (
        <div className='QuestionPreview-field'>
          <Button type='primary' onClick={() => setShowAnswer(true)}>
            Show answer
          </Button>
        </div>
      )}
      {showAnswer && (
        <div className='QuestionPreview-field'>
          <h1 className='QuestionPreview-answer'>
            Answer: Choice {ROMAN[answer]}
          </h1>
          <Button onClick={() => setShowAnswer(false)}>
            Hide answer
          </Button>
        </div>
      )}
    </div>
  )
}
