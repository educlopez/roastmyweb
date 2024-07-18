import AISuggestions from "@/app/components/AISuggestions"
import CoreWebVitals from "@/app/components/CoreWebVitals"
import SEOAnalysis from "@/app/components/SEOAnalysis"
import { AnalysisResult } from "@/app/types"

interface ResultsDisplayProps {
  results: AnalysisResult
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Results</h2>
      <SEOAnalysis data={results.seoData} />
      <CoreWebVitals data={results.cruxData} />
      <AISuggestions suggestions={results.suggestions} />
    </div>
  )
}
