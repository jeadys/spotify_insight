import SectionWrapper from '@/components/core/SectionWrapper'
import TrackGrid from '@/components/grid/TrackGrid'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import { getCurrentUserSavedTracks } from '@/server/api'

export default async function SavedTracks() {
  const savedTracks = await getCurrentUserSavedTracks(50)

  return (
    <>
      {savedTracks ? (
        <>
          <SectionWrapper title="Saved tracks">
            <TrackGrid tracks={savedTracks.items.map(({ track }) => track)} isTrackSaved={savedTracks.items.map(() => true)} />
          </SectionWrapper>
        </>
      ) : (
        <TrackGridSkeleton amount={50} />
      )}
    </>
  )
}
