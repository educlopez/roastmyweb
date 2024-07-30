"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import useUrlStore from "@/app/components/AppContext"
import ResultsDisplay from "@/app/components/ResultsDisplay"
import { AnalysisResult } from "@/app/types"

const FALSE_LOADING_TIME = 3000

export default function AnalyzerForm() {
  const [url, setUrl] = useState("")
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const currentUrl = useUrlStore((state) => state.currentUrl)
  const updateStoreUrl = useUrlStore((state) => state.updateUrl)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    setShowResults(false)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setResults(data)
      updateStoreUrl(url)
      window.history.pushState({}, "", `?url=${url}`)
      // Introduce artificial delay
      setTimeout(() => {
        setIsLoading(false)
        setShowResults(true)
      }, FALSE_LOADING_TIME)
    } catch (error) {
      console.error("Error:", error)
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {!currentUrl && (
        <form onSubmit={handleSubmit} className="mb-8 flex flex-row gap-0">
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
      )}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-12 w-12 rounded-full border-t-4 border-solid border-blue-500"
          />
        </motion.div>
      )}
      {showResults && results && <ResultsDisplay results={results} />}
    </div>
  )
}
