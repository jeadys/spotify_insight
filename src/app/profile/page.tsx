import SectionWrapper from '@/components/core/SectionWrapper'
import ArtistGrid from '@/components/grid/ArtistGrid'
import GenreGrid from '@/components/grid/GenreGrid'
import TrackGrid from '@/components/grid/TrackGrid'
import { getTopArtists, getTopTracks } from '@/server/api'

export default async function page() {
  const topArtists = await getTopArtists('long_term', 12)
  const topTracks = await getTopTracks('long_term', 12)
  const topGenres = topArtists.items.map((artist) => artist.genres).flat()

  return (
    <>
      <SectionWrapper title="Top genres">
        <GenreGrid genres={topGenres} />
      </SectionWrapper>

      <SectionWrapper title="Top artists" seeAll="/profile/top-artists">
        <ArtistGrid artists={topArtists.items} />
      </SectionWrapper>

      <SectionWrapper title="Top tracks" seeAll="/profile/top-tracks">
        <TrackGrid tracks={topTracks.items} />
      </SectionWrapper>
    </>
  )
}
