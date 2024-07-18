import AnalyzerForm from "@/app/components/AnalyzerForm"

export default function Home() {
  return (
    <main className="m-auto flex min-h-screen max-w-[600px] flex-col items-center justify-between">
      <div className="flex flex-col gap-20 py-4">
        <div className="grid">
          <h1 className="mb-4 text-3xl font-bold">
            SEO and Web Vitals Analyzer
          </h1>
          <AnalyzerForm />
        </div>
      </div>
    </main>
  )
}
