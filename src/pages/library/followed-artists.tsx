import { useQuery } from '@tanstack/react-query'

import { SectionWrapper } from '../../components/core'
import { ArtistGrid } from '../../components/grid'
import { ArtistGridSkeleton } from '../../components/skeleton'
import type { IUsersFollowedArtists } from '../../lib/interfaces/user-followed-artists'
import { getCurrentUserFollowedArtists } from '../../lib/spotify'

export default function FollowedArtists() {
  const fetchUserFollowedArtists = async () => {
    const userFollowedArtists = await getCurrentUserFollowedArtists(50)
    return userFollowedArtists.data
  }

  const { data: followedArtists } = useQuery<IUsersFollowedArtists>(['all-followed-artists'], fetchUserFollowedArtists, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      {followedArtists ? (
        <>
          <SectionWrapper title="Followed artists" breadcrumb="true">
            <ArtistGrid items={followedArtists.artists.items} />
          </SectionWrapper>
        </>
      ) : (
        <ArtistGridSkeleton amount={50} />
      )}
    </>
  )
}
