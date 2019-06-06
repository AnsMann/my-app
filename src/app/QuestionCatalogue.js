import React from 'react'
import styled from 'styled-components'
import { AnswerTextArea } from './AnswerTextArea'

const Styledquestion = styled.h4`
  color: #007fbf;
`

export function QuestionCatalogue() {
  const questions = [
    {
      question: 'Was waren die wichtigsten Inhalte in meinen eigenen Worten?',
      name: 'content in own words',
    },
    {
      question: 'Als besonders positiv erinnere ich...',
      name: 'remember positive',
    },
    {
      question: 'Als besonders negativ erinnere ich...',
      name: 'remember negative',
    },
    {
      question: 'Welches Feedback würde ich meinem Coach heute geben?',
      name: 'coach feedback',
    },
    {
      question: 'Zudem ist mir noch folgendes wichtig...',
      name: 'anything else',
    },
  ]

  return questions.map(questionObject => (
    <label key={questions.indexOf(questionObject)}>
      <Styledquestion>{questionObject.question}</Styledquestion>
      <AnswerTextArea name={questionObject.name} />
    </label>
  ))
}
