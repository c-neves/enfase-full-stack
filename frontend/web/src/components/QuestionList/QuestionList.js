import React from 'react'
import { graphql, QueryRenderer } from 'react-relay'
import DesktopLayout from '../DesktopLayout'
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
          ) {
            pageInfo {
              hasNextPage
              endCursor
            }
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
          return (
            <div>
              {props.questions.edges.map(({ node }) => (
                <QuestionListItem key={node.id} question={node} />
              ))}
            </div>
          )
        }
      }}
    />
  )
}
