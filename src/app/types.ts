import { CruxData } from "@/app/lib/cruxAnalyzer"
import { SEOData } from "@/app/lib/seoAnalyzer"

export interface AnalysisResult {
  seoData: SEOData
  cruxData: CruxData
  suggestions: string
}
