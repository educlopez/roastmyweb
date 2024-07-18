import axios from "axios"
import { JSDOM } from "jsdom"

export interface SEOData {
  title: string | null
  metaDescription: string | null
  keywords: string | null
  ogImg: string | null | undefined
  h1Count: number
  // Add more properties as needed
}

export async function analyzeSEO(url: string): Promise<SEOData | null> {
  try {
    const response = await axios.get(url)
    const dom = new JSDOM(response.data)
    const document = dom.window.document

    const title = document.querySelector("title")?.textContent || null
    const metaDescription =
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || null
    const keywords =
      document
        .querySelector('meta[name="keywords"]')
        ?.getAttribute("content") || null
    const ogImg =
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content") || null
    const h1Count = document.querySelectorAll("h1").length

    return {
      title,
      metaDescription,
      keywords,
      ogImg,
      h1Count,
    }
  } catch (error) {
    console.error("Error analyzing SEO:", error)
    return null
  }
}
