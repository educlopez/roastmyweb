import { create } from "zustand"

import { AnalysisResult } from "@/app/types"

interface UrlState {
  currentUrl: string | null
  results: AnalysisResult | null
}
interface UrlActions {
  updateUrl: (url: string) => void
  clearState: () => void
  setResults: (results: AnalysisResult) => void
}

export const useUrlStore = create<UrlState & UrlActions>((set) => ({
  currentUrl: null,
  results: null,

  updateUrl: (url: string) => {
    set(() => ({
      currentUrl: url,
    }))
  },

  clearState: () => {
    set(() => ({
      currentUrl: null,
      results: null,
    }))
  },

  setResults: (results: AnalysisResult) => {
    set(() => ({
      results: results,
    }))
  },
}))

export default useUrlStore
