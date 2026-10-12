interface ResultCardProps {
  correct: number
  incorrect: number
  total: number
  percentage: number
}

function getFeedback(percentage: number) {
  if (percentage >= 90) return 'A brilliant run. You know your way around the web.'
  if (percentage >= 70) return 'A strong showing. Your foundations are in good shape.'
  if (percentage >= 50) return 'Good momentum. A little more practice will sharpen it.'
  return 'Every good builder starts somewhere. Take another pass.'
}

export default function ResultCard({ correct, incorrect, total, percentage }: ResultCardProps) {
  return (
    <section className="result-panel">
      <div className="result-topline"><span>YOUR FIELD NOTES</span><span>QUIZ / 01</span></div>
      <div className="score-lockup">
        <div className="score-ring" style={{ '--score-progress': `${percentage}%` } as React.CSSProperties}>
          <div className="score-ring-inner"><strong>{percentage}<small>%</small></strong><span> SCORE</span></div>
        </div>
        <div className="score-copy">
          <span className="eyebrow">FINAL TALLY</span>
          <h1>{correct} <span>/ {total}</span></h1>
          <p>{getFeedback(percentage)}</p>
        </div>
      </div>
      <div className="result-stats">
        <div><span className="stat-mark stat-mark--correct">+</span><span>Correct</span><strong>{String(correct).padStart(2, '0')}</strong></div>
        <div><span className="stat-mark stat-mark--incorrect">−</span><span>Incorrect</span><strong>{String(incorrect).padStart(2, '0')}</strong></div>
        <div><span className="stat-mark stat-mark--total">=</span><span>Total questions</span><strong>{String(total).padStart(2, '0')}</strong></div>
      </div>
    </section>
  )
}