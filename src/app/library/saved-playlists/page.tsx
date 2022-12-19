import SectionWrapper from '@/components/core/SectionWrapper'
import PlaylistGrid from '@/components/grid/PlaylistGrid'
import PlaylistGridSkeleton from '@/components/skeleton/PlaylistGridSkeleton'
import { getCurrentUserSavedPlaylists } from '@/server/api'

export default async function SavedPlaylists() {
  const savedPlaylists = await getCurrentUserSavedPlaylists(50)

  return (
    <>
      {savedPlaylists ? (
        <>
          <SectionWrapper title="Saved playlists">
            <PlaylistGrid playlists={savedPlaylists.items} />
          </SectionWrapper>
        </>
      ) : (
        <PlaylistGridSkeleton amount={50} />
      )}
    </>
  )
}
