import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SeedType = 'artist' | 'track'
export type AttributeType = 'acousticness' | 'danceability' | 'energy' | 'instrumentalness' | 'popularity' | 'valence'

type GeneratorState = {
  seedCount: number
  artist: {
    id: string
    name: string
  }[]
  track: {
    id: string
    name: string
  }[]
  acousticness: {
    min: number
    max: number
  }
  danceability: {
    min: number
    max: number
  }
  energy: {
    min: number
    max: number
  }
  instrumentalness: {
    min: number
    max: number
  }
  popularity: {
    min: number
    max: number
  }
  valence: {
    min: number
    max: number
  }
}

type GeneratorActions = {
  addSeed: (seedType: SeedType, id: string, name: string) => void
  removeSeed: (seedType: SeedType, id: string) => void
  setRangeValue: (attributeType: AttributeType, min: number, max: number) => void
  reset: () => void
}

export const initialGeneratorState: GeneratorState = {
  seedCount: 0,
  artist: [],
  track: [],
  acousticness: {
    min: 10,
    max: 90,
  },
  danceability: {
    min: 10,
    max: 90,
  },
  energy: {
    min: 10,
    max: 90,
  },
  instrumentalness: {
    min: 10,
    max: 90,
  },
  popularity: {
    min: 10,
    max: 90,
  },
  valence: {
    min: 10,
    max: 90,
  },
}

export const useGeneratorStore = create<GeneratorState & GeneratorActions>()(
  persist(
    (set) => ({
      ...initialGeneratorState,

      addSeed: (seedType: SeedType, id: string, name: string) => {
        set((state) => {
          const seedList = state[seedType]
          const alreadyAdded = seedList.some((seed) => seed.id === id)

          if (state.seedCount >= 5 || alreadyAdded) return state

          return {
            ...state,
            seedCount: state.seedCount + 1,
            [seedType]: [...seedList, { id: id, name: name }],
          }
        })
      },

      removeSeed: (seedType: SeedType, id: string) => {
        set((state) => {
          const seedList = state[seedType]
          const seedIndex = seedList.findIndex((seed) => seed.id === id)

          if (seedIndex === -1) return state

          return {
            ...state,
            seedCount: state.seedCount - 1,
            [seedType]: [...seedList.slice(0, seedIndex), ...seedList.slice(seedIndex + 1)],
          }
        })
      },

      setRangeValue: (attributeType: AttributeType, min: number, max: number) =>
        set((state) => ({
          ...state,
          [attributeType]: {
            min: min,
            max: max,
          },
        })),

      reset: () => set(initialGeneratorState),
    }),
    {
      name: 'generatorStore',
    }
  )
)
