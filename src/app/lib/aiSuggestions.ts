import { generateText } from "ai"

import { CruxData } from "./cruxAnalyzer"
import { groq } from "./groq"
import { SEOData } from "./seoAnalyzer"
import { sanitizeInput } from "./utils"

export async function generateSuggestions(
  seoData: SEOData,
  cruxData: CruxData
): Promise<string> {
  const sanitizedSeoData = sanitizeInput(seoData)
  const sanitizedCruxData = sanitizeInput(cruxData)

  const prompt = `Based on the following SEO and Core Web Vitals data, provide suggestions for improvement:
  SEO Data: ${JSON.stringify(sanitizedSeoData)}
  Core Web Vitals (Mobile): ${JSON.stringify(sanitizedCruxData.mobile)}
  Core Web Vitals (Desktop): ${JSON.stringify(sanitizedCruxData.desktop)}
  Provide 3-5 actionable suggestions to improve the website's performance and SEO for both mobile and desktop. Consider the differences between mobile and desktop performance if significant.`

  const { text } = await generateText({
    model: groq("llama3-8b-8192"),
    prompt: prompt,
  })

  return text
}
