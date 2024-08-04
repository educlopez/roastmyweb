"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import useUrlStore from "@/app/components/AppContext"
import ResultsDisplay from "@/app/components/ResultsDisplay"
import { AnalysisResult } from "@/app/types"

const FALSE_LOADING_TIME = 3000

export function AnalyzerForm() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const currentUrl = useUrlStore((state) => state.currentUrl)
  const updateStoreUrl = useUrlStore((state) => state.updateUrl)
  const results = useUrlStore((state) => state.results)
  const setResults = useUrlStore((state) => state.setResults)
  const clearState = useUrlStore((state) => state.clearState)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const urlParam = searchParams.get("url")
    if (urlParam) {
      setUrl(urlParam)
      handleAnalysis(urlParam)
    } else {
      clearState()
    }
  }, [searchParams])

  const handleAnalysis = async (urlToAnalyze: string) => {
    setIsLoading(true)
    setShowResults(false)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToAnalyze }),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setResults(data)
      updateStoreUrl(urlToAnalyze)
      router.push(`?url=${urlToAnalyze}`, undefined)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleAnalysis(url)
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
              className="shadow-button absolute right-1 top-1 flex h-[28px] w-20 items-center justify-center overflow-hidden rounded-[6px] bg-[#FF2574] py-1 font-medium text-light1 transition-colors duration-200 hover:bg-[#F0246D] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#FF6B00] hover:dark:bg-[#FF5C00]"
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

export default function WrappedAnalyzerForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AnalyzerForm />
    </Suspense>
  )
}
