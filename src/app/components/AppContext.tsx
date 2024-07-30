import { create } from "zustand"

// Define the state structure with types
interface UrlState {
  currentUrl: string | null
}

// Define the actions available within the store
interface UrlActions {
  updateUrl: (url: string) => void
}

export const useUrlStore = create<UrlState & UrlActions>((set) => ({
  currentUrl: null,

  updateUrl: (url: string) => {
    set((state) => ({
      currentUrl: url,
    }))
  },
}))

export default useUrlStore
