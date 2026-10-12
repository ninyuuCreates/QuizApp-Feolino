import type { Question } from '../types/quiz'
import AnswerOption from './AnswerOption'

interface QuestionCardProps {
  question: Question
  selectedAnswer: string | null
  onSelectAnswer: (answer: string) => void
}

export default function QuestionCard({ question, selectedAnswer, onSelectAnswer }: QuestionCardProps) {
  return (
    <section className="question-panel" aria-labelledby="question-title">
      <h1 id="question-title">{question.question}</h1>
      <div className="answer-list">
        {question.options.map((answer) => (
          <AnswerOption
            key={answer}
            answer={answer}
            selected={selectedAnswer === answer}
            onSelect={() => onSelectAnswer(answer)}
          />
        ))}
      </div>
    </section>
  )
}