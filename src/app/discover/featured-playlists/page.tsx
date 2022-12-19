import SectionWrapper from '@/components/core/SectionWrapper'
import PlaylistGrid from '@/components/grid/PlaylistGrid'
import PlaylistGridSkeleton from '@/components/skeleton/PlaylistGridSkeleton'
import { getFeaturedPlaylists } from '@/server/api'

export default async function FeaturedPlaylists() {
  const featured = await getFeaturedPlaylists(50)

  return (
    <>
      {featured ? (
        <>
          <SectionWrapper title="Featured playlists">
            <PlaylistGrid playlists={featured.playlists.items} />
          </SectionWrapper>
        </>
      ) : (
        <PlaylistGridSkeleton amount={50} />
      )}
    </>
  )
}
