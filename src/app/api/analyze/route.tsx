import { NextResponse } from "next/server"

import { generateSuggestions } from "@/app/lib/aiSuggestions"
import { analyzeCrux } from "@/app/lib/cruxAnalyzer"
import { checkRateLimit } from "@/app/lib/rateLimiter"
import { analyzeSEO } from "@/app/lib/seoAnalyzer"
import { isValidUrl, sanitizeInput } from "@/app/lib/utils"

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "unknown"

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
  }

  try {
    const { url } = await request.json()

    if (!url || !isValidUrl(url)) {
      return NextResponse.json(
        { error: "Invalid URL provided" },
        { status: 400 }
      )
    }

    const sanitizedUrl = sanitizeInput(url)

    const seoData = await analyzeSEO(sanitizedUrl)
    const cruxData = await analyzeCrux(sanitizedUrl)

    const suggestions = await generateSuggestions(seoData!, cruxData!)

    return NextResponse.json({ seoData, cruxData, suggestions })
  } catch (error) {
    console.error("Error during analysis:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
