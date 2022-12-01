import { useQuery } from '@tanstack/react-query'

import { SectionWrapper } from '../../components/core'
import { TrackGrid } from '../../components/grid'
import { TrackGridSkeleton } from '../../components/skeleton'
import type { IUsersSavedTracks } from '../../lib/interfaces/user-saved-tracks'
import { getCurrentUserSavedTracks } from '../../lib/spotify'

export default function SavedTracks() {
  const fetchCurrentUserSavedTracks = async () => {
    const userSavedTracks = await getCurrentUserSavedTracks(50)
    return userSavedTracks.data
  }

  const { data: tracks } = useQuery<IUsersSavedTracks>(['all-saved-tracks'], fetchCurrentUserSavedTracks, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      {tracks ? (
        <>
          <SectionWrapper title="Saved tracks" breadcrumb="true">
            <TrackGrid items={tracks.items.map((item) => item.track)} />
          </SectionWrapper>
        </>
      ) : (
        <TrackGridSkeleton amount={50} />
      )}
    </>
  )
}
