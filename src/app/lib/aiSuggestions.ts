import { generateText } from "ai";
import { groq } from "./groq";
import { SEOData } from "./seoAnalyzer";
import { CruxData } from "./cruxAnalyzer";
import { sanitizeInput } from "./utils";

export async function generateSuggestions(
  seoData: SEOData,
  cruxData: CruxData
): Promise<string> {
  const sanitizedSeoData = sanitizeInput(seoData);
  const sanitizedCruxData = sanitizeInput(cruxData);

  const prompt = `Based on the following SEO and Core Web Vitals data, provide suggestions for improvement:
  SEO Data: ${JSON.stringify(sanitizedSeoData)}
  Core Web Vitals: ${JSON.stringify(sanitizedCruxData)}
  Provide 3-5 actionable suggestions to improve the website's performance and SEO.`;

  const { text } = await generateText({
    model: groq("llama3-8b-8192"),
    prompt: prompt,
  });

  return text;
}
