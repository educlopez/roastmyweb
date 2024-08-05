import * as Tabs from "@radix-ui/react-tabs"

import AISuggestions from "@/app/components/AISuggestions"
import CoreWebVitals from "@/app/components/CoreWebVitals"
import SEOAnalysis from "@/app/components/SEOAnalysis"
import { AnalysisResult } from "@/app/types"

interface ResultsDisplayProps {
  results: AnalysisResult
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const { seoData, cruxData, suggestions } = results

  const suggestionsArray = Array.isArray(suggestions) ? suggestions : []
  return (
    <div>
      <h2 className="my-4 text-center text-2xl font-bold md:my-8">Results</h2>
      <div className="flex flex-row gap-4">
        <Tabs.Root className="flex w-full flex-col" defaultValue="seo">
          <Tabs.List
            className="flex shrink-0 border-b border-light1 dark:border-dark1"
            aria-label="Manage your seo"
          >
            <Tabs.Trigger
              className="group flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center bg-light3 px-0 text-[15px] leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:cursor-not-allowed data-[state=active]:text-[#FF2574] data-[state=active]:focus:relative dark:bg-dark3 data-[state=active]:dark:text-[#FF6B00] md:px-5"
              value="seo"
            >
              <span className="rounded-md px-4 py-2 group-data-[state=active]:bg-[#FF2574]/5 group-data-[state=active]:dark:bg-[#FF6B00]/5 group-data-[state=active]:dark:text-[#FF6B00]">
                Seo and Crux analysis
              </span>
            </Tabs.Trigger>
            <Tabs.Trigger
              className="group flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center bg-light3 px-0 text-[15px] leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:cursor-not-allowed data-[state=active]:text-[#FF2574] data-[state=active]:focus:relative dark:bg-dark3 data-[state=active]:dark:text-[#FF6B00] md:px-5"
              value="ai"
            >
              <span className="rounded-md px-4 py-2 group-data-[state=active]:bg-[#FF2574]/5 group-data-[state=active]:dark:bg-[#FF6B00]/5 group-data-[state=active]:dark:text-[#FF6B00]">
                Roasts of the wise
              </span>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className="grow rounded-b-md bg-light3 p-5 outline-none dark:bg-dark3"
            value="seo"
          >
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
          </Tabs.Content>
          <Tabs.Content
            className="grow rounded-b-md bg-light3 p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black dark:bg-dark3"
            value="ai"
          >
            {suggestionsArray.length > 0 ? (
              <AISuggestions suggestions={suggestionsArray} />
            ) : (
              <div>No suggestions available</div>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  )
}
