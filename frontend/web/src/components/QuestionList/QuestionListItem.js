import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'

function QuestionListItem({
  question: { id, text, anwser, choices }
}) {
  return (
    <li>{text}</li>
  )
}

export default createFragmentContainer(
  QuestionListItem,
  {
    question: graphql`
      fragment QuestionListItem_question on Question {
        id
        text
        answer
        choices
      }
    `
  }
)
