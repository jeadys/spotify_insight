'use client'

import { useTransition } from 'react'

import { useStore } from '@/hooks/useStore'
import { createPlaylistBasedOnSeeds } from '@/server/api'
import { initialGeneratorState, useGeneratorStore } from '@/store/useGenerator'
import { calculateTargetAttribute } from '@/utils/calculateTargetAttribute'

export const GeneratorCreate = () => {
  const [isPending, startTransition] = useTransition()
  // Custom useStore hook needed for persist storage to work with NextJS Hydration
  const state = useStore(useGeneratorStore, (state) => state) ?? initialGeneratorState

  return (
    <>
      <button
        onClick={() =>
          startTransition(() =>
            createPlaylistBasedOnSeeds({
              seedArtists: state.artist.map((artist) => artist.id),
              seedTracks: state.track.map((track) => track.id),
              targetAcousticness: calculateTargetAttribute(state.acousticness.min, state.acousticness.max),
              targetDanceability: calculateTargetAttribute(state.danceability.min, state.danceability.max),
              targetEnergy: calculateTargetAttribute(state.energy.min, state.energy.max),
              targetInstrumentalness: calculateTargetAttribute(state.instrumentalness.min, state.instrumentalness.max),
              targetPopularity: state.popularity.min + state.popularity.max / 2,
              targetValence: calculateTargetAttribute(state.valence.min, state.valence.max),
              limit: 50,
            })
          )
        }
        className="rounded-md bg-blue-900 p-3 font-semibold text-white  disabled:cursor-not-allowed disabled:opacity-25"
        disabled={!state.seedCount || isPending}
      >
        {isPending ? 'Generating...' : 'Create Playlist'}
      </button>
    </>
  )
}
