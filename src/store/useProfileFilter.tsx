import { create } from 'zustand'

type FilterState = {
  term: string
  description: string
}

type FilterActions = {
  setProfileFilter: (term: string, description: string) => void
}

const initialState: FilterState = {
  term: 'short_term',
  description: '4 weeks',
}

export const useProfileFilterStore = create<FilterState & FilterActions>()((set) => ({
  ...initialState,

  setProfileFilter: (term: string, description: string) => set(() => ({ term: term, description: description })),
}))
