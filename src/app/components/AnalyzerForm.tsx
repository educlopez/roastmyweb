"use client";

import { useState } from "react";

interface AnalysisResult {
  seoData: any;
  cruxData: any;
  suggestions: string;
}

export default function AnalyzerForm() {
  const [url, setUrl] = useState("");
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const seo = results?.seoData;
  const crux = results?.cruxData;
  const suggestions = results?.suggestions;

  console.log(seo, crux, suggestions);
  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter website URL"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      {results && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Results</h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">SEO Analysis</h3>
            <pre>{JSON.stringify(results.seoData, null, 2)}</pre>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Core Web Vitals</h3>
            <pre>{JSON.stringify(results.cruxData, null, 2)}</pre>
          </div>
          <div>
            <h3 className="text-xl font-semibold">AI Suggestions</h3>
            <p>{results.suggestions}</p>
          </div>
        </div>
      )}
    </div>
  );
}
