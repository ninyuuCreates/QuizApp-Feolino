interface QuizHeaderProps {
  questionNumber: number
  totalQuestions: number
}

export default function QuizHeader({ questionNumber, totalQuestions }: QuizHeaderProps) {
  return (
    <header className="quiz-header">
      <h1>Questions:</h1>
      <span className="question-count">{questionNumber} / {totalQuestions}</span>
    </header>
  )
}