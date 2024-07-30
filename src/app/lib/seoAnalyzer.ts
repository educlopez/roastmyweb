import axios from "axios"
import { JSDOM } from "jsdom"

export interface SEOData {
  title: string | undefined
  metaDescription: string | undefined
  keywords: string | undefined
  ogImg: string | undefined
  h1Count: number
  // Add more properties as needed
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

    return {
      title,
      metaDescription,
      keywords,
      ogImg,
      h1Count,
    }
  } catch (error) {
    console.error("Error analyzing SEO:", error)
    return undefined
  }
}
