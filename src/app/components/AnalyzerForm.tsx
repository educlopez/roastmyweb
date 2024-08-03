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
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-[500px] flex-col gap-3"
        >
          <fieldset className="relative flex w-full gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              className="h-[36px] w-full flex-1 rounded-lg bg-light3 px-2 font-sans text-sm outline-none outline-transparent transition-colors ease-out focus:outline-none focus:ring-1 focus:ring-[#cacaca] active:bg-light2 dark:bg-dark3 dark:shadow-none dark:focus:ring-white/10"
              required
            />
            <button
              type="submit"
              className="shadow-button absolute right-1 top-1 flex h-[28px] w-20 items-center justify-center overflow-hidden rounded-[6px] bg-[#FF2574] py-1 font-medium text-light1 transition-colors duration-200 hover:bg-[#F0246D] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#00C492] hover:dark:bg-[#00B385]"
              disabled={isLoading}
            >
              <span className="text-shadow-sm text-[13px]">
                {isLoading ? "Analyzing..." : "Analyze"}
              </span>
            </button>
          </fieldset>
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
