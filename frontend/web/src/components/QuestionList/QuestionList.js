import React from 'react'
import DesktopLayout from '../DesktopLayout'
import QuestionListItem from '../QuestionListItem'

export default function QuestionList() {
  return questions.map(question => (
    <QuestionListItem key={question.id} {...question} />
  ))
}
