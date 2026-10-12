interface AnswerOptionProps {
  answer: string
  selected: boolean
  onSelect: () => void
}

export default function AnswerOption({ answer, selected, onSelect }: AnswerOptionProps) {
  return (
    <button
      className={`answer-option${selected ? ' answer-option--selected' : ''}`}
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="answer-radio" aria-hidden="true" />
      <span>{answer}</span>
    </button>
  )
}