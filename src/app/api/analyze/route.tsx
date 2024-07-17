import { NextResponse } from "next/server";
import { analyzeSEO } from "@/app/lib/seoAnalyzer";
import { analyzeCrux } from "@/app/lib/cruxAnalyzer";
import { generateSuggestions } from "@/app/lib/aiSuggestions";

export async function POST(request: Request) {
  const { url } = await request.json();

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const seoData = await analyzeSEO(url);
    const cruxData = await analyzeCrux(url);

    const suggestions = await generateSuggestions(seoData!, cruxData!);

    return NextResponse.json({ seoData, cruxData, suggestions });
  } catch (error) {
    console.error("Error during analysis:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
