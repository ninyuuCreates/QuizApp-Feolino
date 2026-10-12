import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { questions } from '../data/questions'
import { useQuiz } from '../context/QuizContext'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'
import QuizHeader from '../components/QuizHeader'

export default function QuizPage() {
  const { progress, selectAnswer, goToPreviousQuestion, advanceQuestion } = useQuiz()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const currentIndex = progress.currentQuestionIndex

  if (progress.completed) return <Navigate to="/result" replace />

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  function handleContinue() {
    if (!progress.answers[currentIndex]) {
      setError('Choose an answer before moving on.')
      return
    }
    setError('')
    advanceQuestion()
    if (isLastQuestion) navigate('/result')
  }

  function handleSelect(answer: string) {
    setError('')
    selectAnswer(answer)
  }

  return (
    <main className="quiz-page">
      <div className="quiz-content">
        <QuizHeader questionNumber={currentIndex + 1} totalQuestions={questions.length} />
        <div className="quiz-progress-copy"><span>Question {currentIndex + 1} of {questions.length}</span><span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span></div>
        <ProgressBar current={currentIndex + 1} total={questions.length} />
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={progress.answers[currentIndex]}
          onSelectAnswer={handleSelect}
        />
        <div className="quiz-controls">
          {currentIndex > 0 && <button className="back-button" type="button" onClick={goToPreviousQuestion}>Previous</button>}
          <div className="continue-group">
            {error && <p className="validation-message" role="alert">{error}</p>}
            <button className="submit-button" type="button" onClick={handleContinue}>
              {isLastQuestion ? 'Finish' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}