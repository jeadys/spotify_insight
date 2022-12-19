import SectionWrapper from '@/components/core/SectionWrapper'
import AlbumGrid from '@/components/grid/AlbumGrid'
import ArtistGrid from '@/components/grid/ArtistGrid'
import TrackGrid from '@/components/grid/TrackGrid'
import { getDoesUserHaveTrackSaved, getSearchItems } from '@/server/api'

export default async function SearchResult({ params }: { params: { searchTerm: string } }) {
  const searchResult = await getSearchItems(params.searchTerm, 6)
  const isTrackSaved = await getDoesUserHaveTrackSaved(
    searchResult.tracks ? searchResult.tracks.items.map((track) => track.id).join(',') : ''
  )

  return (
    <ul>
      {searchResult.artists && searchResult.albums && searchResult.tracks ? (
        <>
          <SectionWrapper title="Artists">
            <ArtistGrid artists={searchResult.artists.items} />
          </SectionWrapper>
          <SectionWrapper title="Albums">
            <AlbumGrid albums={searchResult.albums.items} />
          </SectionWrapper>
          <SectionWrapper title="Tracks">
            <TrackGrid tracks={searchResult.tracks.items} isTrackSaved={isTrackSaved} />
          </SectionWrapper>
        </>
      ) : (
        <>
          <h1>LOADING...</h1>
        </>
      )}
    </ul>
  )
}
