import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type AttributeType = 'acousticness' | 'danceability' | 'energy' | 'instrumentalness' | 'popularity' | 'valence'

type AttributeState = {
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

type AttributeActions = {
  setRangeValue: (type: AttributeType, min: number, max: number) => void
  reset: () => void
}

const initialState: AttributeState = {
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

export const useAttributeStore = create<AttributeState & AttributeActions>()(
  persist(
    (set) => ({
      ...initialState,

      setRangeValue: (type: AttributeType, min: number, max: number) =>
        set((state) => ({
          ...state,
          [type]: {
            min: min,
            max: max,
          },
        })),

      reset: () => set(initialState),
    }),
    {
      name: 'attributeStore',
    }
  )
)
