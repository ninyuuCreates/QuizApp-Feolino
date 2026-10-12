import { Link, Navigate } from 'react-router-dom'
import ResultCard from '../components/ResultCard'
import { questions } from '../data/questions'
import { useQuiz } from '../context/QuizContext'

export default function ResultPage() {
  const { progress, startQuiz } = useQuiz()

  if (!progress.completed || progress.score === null) return <Navigate to="/" replace />

  const total = questions.length
  const correct = progress.score
  const percentage = Math.round((correct / total) * 100)

  return (
    <main className="result-page">
      <header className="result-header">
        <span className="edition-mark">RESULTS</span>
        <span className="result-index">01 — 01</span>
      </header>
      <div className="result-content">
        <ResultCard correct={correct} incorrect={total - correct} total={total} percentage={percentage} />
        <div className="result-actions">
          <Link className="primary-button" to="/quiz" onClick={startQuiz}><span>Retake quiz</span><span className="button-arrow" aria-hidden="true">↻</span></Link>
          <Link className="text-link" to="/" onClick={startQuiz}>Return home <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </main>
  )
}