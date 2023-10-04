'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { useStore } from '@/hooks/useStore'
import { addTracksToPlaylist, createPlaylist, getRecommendationsFromSeeds } from '@/server/api'
import { initialGeneratorState, useGeneratorStore } from '@/store/useGenerator'
import { calculateTargetAttribute } from '@/utils/calculateTargetAttribute'
import { initialGeneratorState, useGeneratorStore } from 'store/useGenerator'

export default function GeneratorCreate() {
  // Custom useStore hook needed for persist storage to work with NextJS Hydration
  const state = useStore(useGeneratorStore, (state) => state) ?? initialGeneratorState
  const session = useSession()
  const router = useRouter()

  const {
    data: recommendationsFromSeeds,
    refetch,
    isInitialLoading: retrieveLoading,
  } = useQuery({
    queryKey: ['recommendation'],
    queryFn: () =>
      getRecommendationsFromSeeds({
        seedArtists: state.artist.map((artist) => artist.id),
        seedTracks: state.track.map((track) => track.id),
        targetAcousticness: calculateTargetAttribute(state.acousticness.min, state.acousticness.max),
        targetDanceability: calculateTargetAttribute(state.danceability.min, state.danceability.max),
        targetEnergy: calculateTargetAttribute(state.energy.min, state.energy.max),
        targetInstrumentalness: calculateTargetAttribute(state.instrumentalness.min, state.instrumentalness.max),
        targetPopularity: state.popularity.min + state.popularity.max / 2,
        targetValence: calculateTargetAttribute(state.valence.min, state.valence.max),
        limit: 50,
      }),
    enabled: false,
    onSuccess: () => {
      mutateCreatePlaylist()
    },
  })

  const { mutate: mutateCreatePlaylist, isLoading: createLoading } = useMutation({
    mutationFn: () =>
      createPlaylist(session.data?.user.id, 'Discover Anytime', 'Created at https://spotify-insight-jeadys.vercel.app', true),
    onSuccess: (data) => {
      mutateAddTracksToPlaylist(data.id)
    },
  })

  const { mutate: mutateAddTracksToPlaylist, isLoading: addLoading } = useMutation({
    mutationFn: (playlistId: string) =>
      addTracksToPlaylist(
        playlistId,
        recommendationsFromSeeds?.tracks.map((track) => track.uri)
      ),
    onSuccess: (data, playlistId) => {
      router.refresh()
    },
  })

  return (
    <button
      type="button"
      onClick={() => refetch()}
      disabled={!state.seedCount}
      className="rounded-md bg-blue-900 p-3 font-semibold text-white  disabled:cursor-not-allowed disabled:opacity-25"
    >
      {retrieveLoading || createLoading || addLoading ? 'Genarating...' : 'Create Playlist'}
    </button>
  )
}
