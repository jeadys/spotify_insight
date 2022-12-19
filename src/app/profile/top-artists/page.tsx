import SectionWrapper from '@/components/core/SectionWrapper'
import ArtistGrid from '@/components/grid/ArtistGrid'
import ArtistGridSkeleton from '@/components/skeleton/ArtistGridSkeleton'
import { getTopArtists } from '@/server/api'

export default async function TopArtists() {
  const topArtists = await getTopArtists('long_term', 50)

  return (
    <>
      {topArtists ? (
        <>
          <SectionWrapper title="Top artists" timeRange={'short'}>
            <ArtistGrid artists={topArtists.items} />
          </SectionWrapper>
        </>
      ) : (
        <ArtistGridSkeleton amount={1} />
      )}
    </>
  )
}
