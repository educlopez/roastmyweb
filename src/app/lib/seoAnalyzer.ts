import axios from "axios";
import { JSDOM } from "jsdom";

export interface SEOData {
  title: string | null;
  metaDescription: string | null;
  h1Count: number;
  // Add more properties as needed
}

export async function analyzeSEO(url: string): Promise<SEOData | null> {
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    const title = document.querySelector("title")?.textContent || null;
    const metaDescription =
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || null;
    const h1Count = document.querySelectorAll("h1").length;

    return {
      title,
      metaDescription,
      h1Count,
    };
  } catch (error) {
    console.error("Error analyzing SEO:", error);
    return null;
  }
}
