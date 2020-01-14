import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { message, Tooltip, Icon } from 'antd'
import { navigate } from '@reach/router'
import DeleteQuestionMutation from '../../relay/mutations/DeleteQuestionMutation'
import './QuestionListItem.css'

function QuestionListItem({
  question: { id, text, anwser, choices }
}) {
  function handleDeleteItem() {
    const hide = message.loading('Deleting question...')
    DeleteQuestionMutation.commit(id, error => {
      hide()
      if (error) {
        message.error(error.message, 6)
      } else {
        message.success('Question deleted', 1)
      }
    })
  }

  return (
    <li className='QuestionListItem-li'>
      <div
        className='QuestionListItem-text'
        onClick={() => navigate(`/preview/${id}`)}
      >
        {text}
      </div>
      <div className='QuestionListItem-actions'>
          <Tooltip placement='bottom' title='Preview'>
            <Icon
              type='eye'
              onClick={() => navigate(`/preview/${id}`)}
            />
          </Tooltip>
          <Tooltip placement='bottom' title='Edit'>
            <Icon
              type='edit'
              onClick={() => navigate(`/edit/${id}`)}
            />
          </Tooltip>
          <Tooltip placement='bottom' title='Delete'>
            <Icon
              type='delete'
              onClick={handleDeleteItem}
            />
          </Tooltip>
      </div>
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
