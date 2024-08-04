import axios from "axios"

const API_KEY = process.env.GOOGLE_API_KEY
const API_ENDPOINT =
  "https://chromeuxreport.googleapis.com/v1/records:queryRecord"

export interface CruxMetrics {
  largest_contentful_paint: {
    histogram: { start: number; end: number; density: number }[]
    percentiles: { p75: number | null }
  } | null
  // first_input_delay: {
  //   histogram: { start: number; end: number; density: number }[]
  //   percentiles: { p75: number | null }
  // } | null
  cumulative_layout_shift: {
    histogram: { start: number; end: number; density: number }[]
    percentiles: { p75: number | null }
  } | null
  interaction_to_next_paint: {
    histogram: { start: number; end: number; density: number }[]
    percentiles: { p75: number | null }
  } | null
  navigation_types: {
    histogram: { start: number; end: number; density: number }[]
  } | null
}

export interface CruxData {
  mobile: CruxMetrics
  desktop: CruxMetrics
}

async function fetchCruxData(
  url: string,
  formFactor: "PHONE" | "DESKTOP"
): Promise<CruxMetrics> {
  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        origin: url,
        formFactor: formFactor,
        metrics: [
          "largest_contentful_paint",
          // "first_input_delay",
          "cumulative_layout_shift",
          "interaction_to_next_paint",
          "navigation_types",
        ],
      },
      {
        params: { key: API_KEY },
      }
    )

    return response.data.record.metrics
  } catch (error) {
    console.error(`Error analyzing CrUX for ${formFactor}:`, error)
    return {
      largest_contentful_paint: null,
      // first_input_delay: null,
      cumulative_layout_shift: null,
      interaction_to_next_paint: null,
      navigation_types: null,
    }
  }
}

export async function analyzeCrux(url: string): Promise<CruxData> {
  const [mobileData, desktopData] = await Promise.all([
    fetchCruxData(url, "PHONE"),
    fetchCruxData(url, "DESKTOP"),
  ])

  return {
    mobile: mobileData,
    desktop: desktopData,
  }
}
