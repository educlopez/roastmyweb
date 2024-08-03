interface AISuggestionsProps {
  suggestions: string[]
}

export default function AISuggestions({ suggestions }: AISuggestionsProps) {
  return (
    <div>

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
