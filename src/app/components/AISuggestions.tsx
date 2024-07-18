interface AISuggestionsProps {
  suggestions: string
}

export default function AISuggestions({ suggestions }: AISuggestionsProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold">AI Suggestions</h3>
      <p>{suggestions}</p>
    </div>
  )
}
