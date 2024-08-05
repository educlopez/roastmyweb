import axios from "axios"
import { JSDOM } from "jsdom"

export interface SEOData {
  title: string | undefined
  metaDescription: string | undefined
  keywords: string | undefined
  ogImg: string | undefined
  h1Count: number
  h2Count?: number
  robots?: string
  googlebot?: string
}

export async function analyzeSEO(url: string): Promise<SEOData | undefined> {
  try {
    const response = await axios.get(url)

    const dom = new JSDOM(response.data)

    const document = dom.window.document

    const title = document.querySelector("title")?.textContent || undefined
    const metaDescription =
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || undefined
    const keywords =
      document
        .querySelector('meta[name="keywords"]')
        ?.getAttribute("content") || undefined
    const ogImg =
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content") || undefined
    const h1Count = document.querySelectorAll("h1").length
    const h2Count = document.querySelectorAll("h2").length
    const robots =
      document.querySelector('meta[name="robots"]')?.getAttribute("content") ||
      undefined
    const googlebot =
      document
        .querySelector('meta[name="googlebot"]')
        ?.getAttribute("content") || undefined

    return {
      title,
      metaDescription,
      keywords,
      ogImg,
      h1Count,
      h2Count,
      robots,
      googlebot,
    }
  } catch (error) {
    console.error("Error analyzing SEO:", error)
    return undefined
  }
}
