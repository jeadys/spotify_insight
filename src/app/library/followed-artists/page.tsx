import SectionWrapper from '@/components/core/SectionWrapper'
import ArtistGrid from '@/components/grid/ArtistGrid'
import ArtistGridSkeleton from '@/components/skeleton/ArtistGridSkeleton'
import { getCurrentUserFollowedArtists } from '@/server/api'

export default async function FollowedArtists() {
  const followedArtists = await getCurrentUserFollowedArtists(50)

  return (
    <>
      {followedArtists ? (
        <>
          <SectionWrapper title="Followed artists">
            <ArtistGrid artists={followedArtists.artists.items} />
          </SectionWrapper>
        </>
      ) : (
        <ArtistGridSkeleton amount={50} />
      )}
    </>
  )
}
