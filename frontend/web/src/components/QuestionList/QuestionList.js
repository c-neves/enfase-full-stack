import React from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import { navigate } from '@reach/router'
// import DesktopLayout from '../DesktopLayout'
import QuestionListItem from './QuestionListItem'
import environment from '../../relay/environment'

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
      render={({error, props}) => {
        if (error) {
          return <div>Error!</div>
        } else  if (!props) {
          return <div>Loading...</div>
        } else {
          const { questions: { edges } } = props
          const nodes = edges.map(({ node }) => node).filter(Boolean)
          return (
            <div>
              <button onClick={() => navigate('/create')}>+</button>
            {nodes.length > 0 ? nodes.map(node => (
                <QuestionListItem key={node.id} question={node} />
              )) : (
                <div>No questions yet!</div>
              )}
            </div>
          )
        }
      }}
    />
  )
}
