import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import AlbumGrid from '@/components/grid/AlbumGrid'
import ArtistGrid from '@/components/grid/ArtistGrid'
import TrackGrid from '@/components/grid/TrackGrid'
import ArtistGridSkeleton from '@/components/skeleton/ArtistGridSkeleton'
import { getSearchItems } from '@/server/api'

export default async function SearchResult({ params }: { params: { searchTerm: string } }) {
  const searchResult = await getSearchItems(params.searchTerm, 6)

  return (
    <>
      {searchResult.artists && searchResult.albums && searchResult.tracks && (
        <>
          <Suspense fallback={<ArtistGridSkeleton amount={50} />}>
            <SectionWrapper title="Artists">
              <ArtistGrid artists={searchResult.artists.items} />
            </SectionWrapper>
          </Suspense>
          <SectionWrapper title="Albums">
            <AlbumGrid albums={searchResult.albums.items} />
          </SectionWrapper>
          <SectionWrapper title="Tracks">
            <TrackGrid tracks={searchResult.tracks.items} />
          </SectionWrapper>
        </>
      )}
    </>
  )
}
