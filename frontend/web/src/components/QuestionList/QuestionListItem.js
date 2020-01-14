import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { Icon } from 'antd'
import { navigate } from '@reach/router'
import DeleteQuestionMutation from '../../relay/mutations/DeleteQuestionMutation'

function QuestionListItem({
  question: { id, text, anwser, choices }
}) {
  return (
    <li style={{ fontSize: '23px' }}>
      {text}
      <Icon
        type='delete'
        style={{ float: 'right', cursor: 'pointer' }}
        onClick={() => DeleteQuestionMutation.commit(id)}
      />
      <Icon
        type='edit'
        style={{ float: 'right', cursor: 'pointer' }}
        onClick={() => navigate(`/edit/${id}`)}
      />
    <Icon type='eye' style={{ float: 'right', cursor: 'pointer' }} />
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
