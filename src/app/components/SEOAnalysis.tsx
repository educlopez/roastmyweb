import { SEOData } from "@/app/lib/seoAnalyzer"

interface SEOAnalysisProps {
  data: SEOData
}

export default function SEOAnalysis({ data }: SEOAnalysisProps) {
  return (
    <div className="mb-4">
      {/* Create cards or charts using the SEO data */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">Title</h4>
          <p>{data.title}</p>
        </div>
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">Description</h4>
          <p>{data.metaDescription}</p>
        </div>
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">Keywords</h4>
          <p>{data.keywords}</p>
        </div>
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">Og Image</h4>
          <img
            src={data.ogImg}
            alt={data.title}
            className="w-[400px] rounded-md"
          />
        </div>
        <div className="rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
          <h4 className="text-lg font-semibold">H1</h4>
          <p>{data.h1Count}</p>
        </div>
      </div>
    </div>
  )
}
