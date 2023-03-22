import Section from '@/components/layout/Section'
import AlbumList from '@/components/list/AlbumList'
import ArtistList from '@/components/list/ArtistList'
import TrackList from '@/components/list/TrackList'
import { getSearchItems } from '@/server/api'

export default async function SearchResult({ params }: { params: { searchTerm: string } }) {
  const searchResult = await getSearchItems(params.searchTerm, 12)

  return (
    <>
      {searchResult.artists && searchResult.albums && searchResult.tracks && (
        <>
          <Section title="Artists">
            <ArtistList artists={searchResult.artists.items} />
          </Section>

          <Section title="Albums">
            <AlbumList albums={searchResult.albums.items} />
          </Section>

          <Section title="Tracks">
            <TrackList tracks={searchResult.tracks.items} />
          </Section>
        </>
      )}
    </>
  )
}
