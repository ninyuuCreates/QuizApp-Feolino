import type { Question } from '../types/quiz'

export const questions: Question[] = [
  {
    id: 1,
    question: '2 + 2 = ?',
    options: ['4', '5', '6', '7'],
    correctAnswer: '4',
  },
  {
    id: 2,
    question: '9 * 2 = ?',
    options: ['18', '20', '22', '24'],
    correctAnswer: '18',
  },
  {
    id: 3,
    question: '11 * 21 = ?',
    options: ['231', '232', '233', '234'],
    correctAnswer: '231',
  },
  {
    id: 4,
    question: '8 * 9 = ?',
    options: ['72', '81', '90', '99'],
    correctAnswer: '72',
  },
  {
    id: 5,
    question: 'What is the smallest planet in our solar system?',
    options: ['Mercury', 'Venus', 'Earth', 'Mars'],
    correctAnswer: 'Mercury',
  },
 
]