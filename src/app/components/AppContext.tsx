import { create } from "zustand"

// Define the state structure with types
interface UrlState {
  currentUrl: string | null
  results: any | null // Replace 'any' with the actual type of your results
}

// Define the actions available within the store
interface UrlActions {
  updateUrl: (url: string) => void
  clearState: () => void
  setResults: (results: any) => void // Replace 'any' with the actual type of your results
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
    // Replace 'any' with the actual type of your results
    set((state) => ({
      results: results,
    }))
  },
}))

export default useUrlStore
