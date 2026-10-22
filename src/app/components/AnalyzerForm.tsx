"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import useUrlStore from "@/app/components/AppContext"
import ResultsDisplay from "@/app/components/ResultsDisplay"
import { AnalysisResult } from "@/app/types"

import ScannerWindowAnimation from "./Scaner"

interface AnalyzerFormProps {
  minLoadingTime?: number
}

async function analyzeUrl(urlToAnalyze: string): Promise<AnalysisResult> {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: urlToAnalyze }),
  })

  if (!response.ok) throw new Error("Analysis failed")
  return response.json()
}

function UrlParamAnalysis({
  url,
  minLoadingTime,
}: {
  url: string
  minLoadingTime: number
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const results = useUrlStore((state) => state.results)
  const setResults = useUrlStore((state) => state.setResults)
  const updateStoreUrl = useUrlStore((state) => state.updateUrl)
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    const startTime = Date.now()

    ;(async () => {
      try {
        const data = await analyzeUrl(url)
        if (cancelled) return
        setResults(data)
        updateStoreUrl(url)
        router.push(`?url=${url}`, undefined)

        const remainingTime = Math.max(0, minLoadingTime - (Date.now() - startTime))
        await new Promise((resolve) => setTimeout(resolve, remainingTime))
      } catch (error) {
        console.error("Error:", error)
      } finally {
        if (!cancelled) {
          setIsLoading(false)
          setShowResults(true)
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [url, minLoadingTime, router, setResults, updateStoreUrl])

  return (
    <>
      {isLoading && <ScannerWindowAnimation />}
      {showResults && results && <ResultsDisplay results={results} />}
    </>
  )
}

export function AnalyzerForm({ minLoadingTime = 3000 }: AnalyzerFormProps) {
  const searchParams = useSearchParams()
  const urlParam = searchParams.get("url")
  const [typedUrl, setTypedUrl] = useState<string | null>(null)
  const url = typedUrl ?? urlParam ?? ""
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const currentUrl = useUrlStore((state) => state.currentUrl)
  const updateStoreUrl = useUrlStore((state) => state.updateUrl)
  const results = useUrlStore((state) => state.results)
  const setResults = useUrlStore((state) => state.setResults)
  const clearState = useUrlStore((state) => state.clearState)
  const router = useRouter()

  useEffect(() => {
    if (!urlParam) {
      clearState()
    }
  }, [urlParam, clearState])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setShowResults(false)
    const startTime = Date.now()

    try {
      const data = await analyzeUrl(url)
      setResults(data)
      updateStoreUrl(url)
      router.push(`?url=${url}`, undefined)

      const remainingTime = Math.max(0, minLoadingTime - (Date.now() - startTime))
      await new Promise((resolve) => setTimeout(resolve, remainingTime))
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
      setShowResults(true)
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
              onChange={(e) => setTypedUrl(e.target.value)}
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
      {urlParam ? (
        <UrlParamAnalysis
          key={urlParam}
          url={urlParam}
          minLoadingTime={minLoadingTime}
        />
      ) : (
        <>
          {isLoading && <ScannerWindowAnimation />}
          {showResults && results && <ResultsDisplay results={results} />}
        </>
      )}
    </div>
  )
}

export default function WrappedAnalyzerForm({
  minLoadingTime,
}: AnalyzerFormProps) {
  return (
    <Suspense fallback={<ScannerWindowAnimation />}>
      <AnalyzerForm minLoadingTime={minLoadingTime} />
    </Suspense>
  )
}
