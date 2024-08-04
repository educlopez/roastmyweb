import { NextRequest, NextResponse } from "next/server"

import { generateSuggestions } from "@/app/lib/aiSuggestions"
import { analyzeCrux } from "@/app/lib/cruxAnalyzer"
import { checkRateLimit } from "@/app/lib/rateLimiter"
import { analyzeSEO } from "@/app/lib/seoAnalyzer"
import { isValidUrl, sanitizeInput } from "@/app/lib/utils"

async function handleRequest(url: string, ip: string) {
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 })
  }

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "Invalid URL provided" }, { status: 400 })
  }

  const sanitizedUrl = sanitizeInput(url)

  const seoData = await analyzeSEO(sanitizedUrl)
  const cruxData = await analyzeCrux(sanitizedUrl)

  const suggestions = await generateSuggestions(seoData!, cruxData!)

  return NextResponse.json({ seoData, cruxData, suggestions })
}

export async function GET(request: NextRequest) {
  const ip = request.ip || "unknown"
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 })
  }

  try {
    return await handleRequest(url, ip)
  } catch (error) {
    console.error("Error during analysis:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const ip = request.ip || "unknown"

  try {
    const { url } = await request.json()
    return await handleRequest(url, ip)
  } catch (error) {
    console.error("Error during analysis:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
