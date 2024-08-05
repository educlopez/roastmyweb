import { create } from "zustand"

// Define the state structure with types
interface UrlState {
  currentUrl: string | null
  results: any | null
}
interface UrlActions {
  updateUrl: (url: string) => void
  clearState: () => void
  setResults: (results: any) => void
}

export const useUrlStore = create<UrlState & UrlActions>((set) => ({
  currentUrl: null,
  results: null,

  updateUrl: (url: string) => {
    set((state) => ({
      currentUrl: url,
    }))
  },

  clearState: () => {
    set(() => ({
      currentUrl: null,
      results: null,
    }))
  },

  setResults: (results: any) => {
    set((state) => ({
      results: results,
    }))
  },
}))

export default useUrlStore
