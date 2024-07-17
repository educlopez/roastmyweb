import AnalyzerForm from "@/app/components/AnalyzerForm";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">SEO and Web Vitals Analyzer</h1>
      <AnalyzerForm />
    </main>
  );
}
