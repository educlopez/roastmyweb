"use client"

import { useState } from "react"

import ResultsDisplay from "@/app/components/ResultsDisplay"
import { AnalysisResult } from "@/app/types"

export default function AnalyzerForm() {
  const [url, setUrl] = useState("")
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="w-full rounded border p-2"
          required
        />
        <button
          type="submit"
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      {results && <ResultsDisplay results={results} />}
    </div>
  )
}
