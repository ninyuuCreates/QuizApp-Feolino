import { Link } from 'react-router-dom'
import { useQuiz } from '../context/QuizContext'

export default function HomePage() {
  const { startQuiz } = useQuiz()

  return (
    <main className="home-page">
      <section className="welcome-panel">
        <div className="welcome-copy">
          <p>Welcome to the</p>
          <h1>Frontend Quiz!</h1>
          <Link className="start-button" to="/quiz" onClick={startQuiz}>Start Quiz</Link>
        </div>
      </section>
    </main>
  )
}