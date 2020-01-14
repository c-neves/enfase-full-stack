import React from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import { Spin, Icon } from 'antd'
import { navigate } from '@reach/router'
import DesktopLayout from '../DesktopLayout'
import QuestionListItem from './QuestionListItem'
import environment from '../../relay/environment'
import './QuestionList.css'

export default function QuestionList() {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query QuestionListQuery {
          questions(
            first: 2147483646  # max GraphQLInt - 1, to fetch all questions
          ) @connection(key: "QuestionList_questions") {
            edges {
              node {
                id
                ...QuestionListItem_question
              }
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return (
            <DesktopLayout>
              <div className='QuestionList-error'>
                <h1>{error.message}</h1>
                <pre>{error.stack}</pre>
              </div>
            </DesktopLayout>
          )
        } else  if (!props) {
          return <div className='QuestionList-loading'><Spin /></div>
        } else {
          const { questions: { edges } } = props
          const nodes = edges.map(({ node }) => node).filter(Boolean)
          return (
            <DesktopLayout>
              <button
                className='QuestionList-create-button'
                onClick={() => navigate('/create')}
              >
                <Icon type='plus' />
              </button>
              <ul className='QuestionList-ul'>
                {nodes.length > 0 ? nodes.map(node => (
                  <QuestionListItem key={node.id} question={node} />
                )) : (
                  <div className='QuestionList-empty-list'>
                    <h2>No questions yet!</h2>
                  </div>
                )}
              </ul>
            </DesktopLayout>
          )
        }
      }}
    />
  )
}
