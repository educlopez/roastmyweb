import axios from "axios";

const API_KEY = process.env.GOOGLE_API_KEY;
const API_ENDPOINT =
  "https://chromeuxreport.googleapis.com/v1/records:queryRecord";

export interface CruxData {
  largest_contentful_paint: any;
  first_input_delay: any;
  cumulative_layout_shift: any;
}

export async function analyzeCrux(url: string): Promise<CruxData | null> {
  try {
    const response = await axios.post(
      API_ENDPOINT,
      {
        origin: url,
        formFactor: "Desktop",
        metrics: [
          "largest_contentful_paint",
          "first_input_delay",
          "cumulative_layout_shift",
        ],
      },
      {
        params: { key: API_KEY },
      }
    );

    return response.data.record.metrics;
  } catch (error) {
    console.error("Error analyzing CrUX:", error);
    return null;
  }
}
