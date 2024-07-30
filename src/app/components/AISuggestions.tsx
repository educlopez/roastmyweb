interface AISuggestionsProps {
  suggestions: string[]
}

export default function AISuggestions({ suggestions }: AISuggestionsProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold">AI Suggestions</h3>
      <div className="flex flex-col gap-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2"
          >
            <p>{suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
