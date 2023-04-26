import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SeedType = 'artist' | 'track' | 'genre'

type SeedState = {
  seedCount: number
  artist: {
    id: string
    name: string
  }[]
  track: {
    id: string
    name: string
  }[]
  genre: {
    id: string
    name: string
  }[]
}

type SeedActions = {
  addSeed: (type: SeedType, id: string, name: string) => void
  removeSeed: (type: SeedType, id: string) => void
}

const initialState: SeedState = {
  seedCount: 0,
  artist: [],
  track: [],
  genre: [],
}

export const useSeedStore = create<SeedState & SeedActions>()(
  persist(
    (set) => ({
      ...initialState,

      addSeed: (type: SeedType, id: string, name: string) => {
        set((state) => {
          const seedList = state[type]
          const alreadyAdded = seedList.some((seed) => seed.id === id)

          if (state.seedCount >= 5 || alreadyAdded) return state

          return {
            ...state,
            seedCount: state.seedCount + 1,
            [type]: [...seedList, { id: id, name: name }],
          }
        })
      },

      removeSeed: (type: SeedType, id: string) => {
        set((state) => {
          const seedList = state[type]
          const seedIndex = seedList.findIndex((seed) => seed.id === id)

          if (seedIndex === -1) return state

          return {
            ...state,
            seedCount: state.seedCount - 1,
            [type]: [...seedList.slice(0, seedIndex), ...seedList.slice(seedIndex + 1)],
          }
        })
      },
    }),
    {
      name: 'seedStore',
    }
  )
)
