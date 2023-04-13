import { create } from 'zustand'

type FilterType = {
  profileFilter: string
  setProfileFilter: (term: string) => void
}

export const useProfileFilterStore = create<FilterType>((set) => ({
  profileFilter: 'short_term',
  setProfileFilter: (term: string) => set(() => ({ profileFilter: term })),
}))
