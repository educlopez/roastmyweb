import { SEOData } from "@/app/lib/seoAnalyzer"

interface SEOAnalysisProps {
  data: SEOData
}

export default function SEOAnalysis({ data }: SEOAnalysisProps) {
  return (
    <div className="mb-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        <div className="col-span-1 flex h-full flex-col gap-4">
          <div className="h-1/2 rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
            <h4 className="text-lg font-semibold">H1</h4>
            <p>{data.h1Count}</p>
          </div>
          <div className="h-1/2 rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
            <h4 className="text-lg font-semibold">H2</h4>
            <p>{data.h2Count}</p>
          </div>
        </div>
        <div className="col-span-1 flex h-full flex-col gap-4">
          <div className="h-1/2 rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
            <h4 className="text-lg font-semibold">Robots</h4>
            <p>{data.robots}</p>
          </div>
          <div className="h-1/2 rounded-lg bg-light2 p-4 shadow dark:bg-dark2">
            <h4 className="text-lg font-semibold">GoogleBots</h4>
            <p>{data.googlebot}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
