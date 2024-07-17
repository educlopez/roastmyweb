import { generateText } from "ai";
import { groq } from "./groq";
import { SEOData } from "./seoAnalyzer";
import { CruxData } from "./cruxAnalyzer";

export async function generateSuggestions(
  seoData: SEOData,
  cruxData: CruxData
): Promise<string> {
  const prompt = `Based on the following SEO and Core Web Vitals data, provide suggestions for improvement:
  SEO Data: ${JSON.stringify(seoData)}
  Core Web Vitals: ${JSON.stringify(cruxData)}
  Provide 3-5 actionable suggestions to improve the website's performance and SEO.`;

  const { text } = await generateText({
    model: groq("llama3-8b-8192"),
    prompt: prompt,
  });

  return text;
}
