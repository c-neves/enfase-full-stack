import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import DeleteQuestionMutation from '../../relay/mutations/DeleteQuestionMutation'

function QuestionListItem({
  question: { id, text, anwser, choices }
}) {
  return (
    <li onClick={() => DeleteQuestionMutation.commit(id)}>
      {text}
    </li>
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
