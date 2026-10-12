import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { questions } from '../data/questions'
import type { QuizProgress } from '../types/quiz'

const STORAGE_KEY = 'quiz-master-progress'

const emptyProgress: QuizProgress = {
  currentQuestionIndex: 0,
  answers: questions.map(() => null),
  completed: false,
  score: null,
}

interface QuizContextValue {
  progress: QuizProgress
  startQuiz: () => void
  selectAnswer: (answer: string) => void
  goToPreviousQuestion: () => void
  advanceQuestion: () => void
}

const QuizContext = createContext<QuizContextValue | null>(null)

function readStoredProgress(): QuizProgress {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (!stored) return emptyProgress

    const parsed: unknown = JSON.parse(stored)
    if (typeof parsed !== 'object' || parsed === null) return emptyProgress

    const candidate = parsed as Partial<QuizProgress>
    if (
      !Number.isInteger(candidate.currentQuestionIndex) ||
      !Array.isArray(candidate.answers) ||
      candidate.answers.length !== questions.length ||
      typeof candidate.completed !== 'boolean' ||
      !(candidate.score === null || Number.isInteger(candidate.score))
    ) return emptyProgress

    return {
      currentQuestionIndex: Math.min(Math.max(candidate.currentQuestionIndex!, 0), questions.length - 1),
      answers: candidate.answers.map((answer) => typeof answer === 'string' ? answer : null),
      completed: candidate.completed,
      score: candidate.score ?? null,
    }
  } catch {
    return emptyProgress
  }
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<QuizProgress>(readStoredProgress)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  function startQuiz() {
    setProgress(emptyProgress)
  }

  function selectAnswer(answer: string) {
    setProgress((current) => {
      if (current.completed) return current
      const answers = [...current.answers]
      answers[current.currentQuestionIndex] = answer
      return { ...current, answers }
    })
  }

  function goToPreviousQuestion() {
    setProgress((current) => ({
      ...current,
      currentQuestionIndex: Math.max(0, current.currentQuestionIndex - 1),
    }))
  }

  function advanceQuestion() {
    setProgress((current) => {
      if (!current.answers[current.currentQuestionIndex] || current.completed) return current

      if (current.currentQuestionIndex < questions.length - 1) {
        return { ...current, currentQuestionIndex: current.currentQuestionIndex + 1 }
      }

      const score = questions.reduce(
        (total, question, index) => total + (current.answers[index] === question.correctAnswer ? 1 : 0),
        0,
      )
      return { ...current, completed: true, score }
    })
  }

  return (
    <QuizContext.Provider value={{ progress, startQuiz, selectAnswer, goToPreviousQuestion, advanceQuestion }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) throw new Error('useQuiz must be used inside QuizProvider')
  return context
}