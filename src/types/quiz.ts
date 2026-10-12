export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

export interface QuizProgress {
  currentQuestionIndex: number
  answers: (string | null)[]
  completed: boolean
  score: number | null
}