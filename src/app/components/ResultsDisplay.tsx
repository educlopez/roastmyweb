import AISuggestions from "@/app/components/AISuggestions"
import CoreWebVitals from "@/app/components/CoreWebVitals"
import SEOAnalysis from "@/app/components/SEOAnalysis"
import { AnalysisResult } from "@/app/types"

interface ResultsDisplayProps {
  results: AnalysisResult
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { seoData, cruxData, suggestions } = results

  // Ensure suggestions is an array of strings
  const suggestionsArray = Array.isArray(suggestions) ? suggestions : []
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">Results</h2>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4">
          {seoData ? (
            <SEOAnalysis data={seoData} />
          ) : (
            <div>No SEO data available</div>
          )}
          {cruxData ? (
            <CoreWebVitals data={cruxData} />
          ) : (
            <div>No Core Web Vitals data available</div>
          )}
        </div>
        {suggestionsArray.length > 0 ? (
          <AISuggestions suggestions={suggestionsArray} />
        ) : (
          <div>No suggestions available</div>
        )}
      </div>
    </div>
  )
}
