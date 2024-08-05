"use server"

import { generateObject } from "ai"
import { z } from "zod"

import { CruxData } from "./cruxAnalyzer"
import { groq } from "./groq"
import { SEOData } from "./seoAnalyzer"
import { sanitizeInput } from "./utils"

export async function generateSuggestions(
  seoData: SEOData,
  cruxData: CruxData
): Promise<string[]> {
  "use server"
  const sanitizedSeoData = sanitizeInput(seoData)
  const sanitizedCruxData = sanitizeInput(cruxData)

  const prompt = `"You are a master god of SEO, UX, UI and performance consultant with a sarcastic, ironic and funny touch. Based on the following SEO and Core Web Vitals data, provide suggestions for improvement:
  SEO Data: ${JSON.stringify(sanitizedSeoData)}
  Core Web Vitals (Mobile): ${JSON.stringify(sanitizedCruxData.mobile)}
  Core Web Vitals (Desktop): ${JSON.stringify(sanitizedCruxData.desktop)}
  Provide actionable suggestions to improve the website's performance and SEO for both mobile and desktop with a sarcastic, ironic and funny touch. Consider the differences between mobile and desktop performance if significant."`

  const { object } = await generateObject({
    model: groq("llama3-8b-8192"),
    prompt: prompt,
    schema: z.object({
      text: z.array(
        z.object({
          name: z
            .string()
            .describe(
              "title of the suggestion but with a sarcastic, ironic and funny touch"
            ),
          message: z
            .string()
            .describe(
              "The suggestion itself but with a sarcastic, ironic and funny touch"
            ),
        })
      ),
    }),
  })

  const suggestions = object.text.map(
    (suggestion) => `${suggestion.name}: ${suggestion.message}`
  )
  return suggestions
}
