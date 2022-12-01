import { useQuery } from '@tanstack/react-query'

import { SectionWrapper } from '../../components/core'
import { ArtistGrid, TrackGrid } from '../../components/grid'
import { ArtistGridSkeleton, TrackGridSkeleton } from '../../components/skeleton'
import type { IUsersTopArtists } from '../../lib/interfaces/user-top-artists'
import type { IUsersTopTracks } from '../../lib/interfaces/users-top-tracks'
import { getTopArtists, getTopTracks } from '../../lib/spotify'

export default function Profile() {
  const fetchTopArtists = async () => {
    const userTopArtists = await getTopArtists('short_term', 12)
    return userTopArtists.data
  }

  const fetchTopTracks = async () => {
    const userTopTracks = await getTopTracks('short_term', 6)
    return userTopTracks.data
  }

  const { data: topArtists } = useQuery<IUsersTopArtists>(['top-artists'], fetchTopArtists, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  const { data: topTracks } = useQuery<IUsersTopTracks>(['top-tracks'], fetchTopTracks, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      {topArtists && topTracks ? (
        <>
          <SectionWrapper title="Top artists this month" seeAll="/profile/top-artists">
            <ArtistGrid items={topArtists.items} />
          </SectionWrapper>
          <SectionWrapper title="Top tracks this month" seeAll="/profile/top-tracks">
            <TrackGrid items={topTracks.items} />
          </SectionWrapper>
        </>
      ) : (
        <>
          <ArtistGridSkeleton amount={12} />
          <TrackGridSkeleton amount={6} />
        </>
      )}
    </>
  )
}
