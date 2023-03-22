import ArtistHeader from '@/components/header/ArtistHeader'
import Section from '@/components/layout/Section'
import AlbumList from '@/components/list/AlbumList'
import ArtistList from '@/components/list/ArtistList'
import GenreList from '@/components/list/GenreList'
import TrackList from '@/components/list/TrackList'
import { getArtistAlbums, getArtistById, getArtistRelatedArtists, getArtistTopTracks } from '@/server/api'

export default async function Artist({ params }: { params: { artistId: string } }) {
  const artist = await getArtistById(params.artistId)
  const artistTopTracks = await getArtistTopTracks(params.artistId)
  const artistAlbums = await getArtistAlbums(params.artistId, 12)
  const artistRelatedArtists = await getArtistRelatedArtists(params.artistId)

  return (
    <>
      <ArtistHeader artist={artist} />

      <Section title="Genres" description={`Associated with ${artist.name}`}>
        <GenreList genres={artist.genres} />
      </Section>

      <Section title="Tracks" description={`Released by ${artist.name}`}>
        <TrackList tracks={artistTopTracks.tracks} />
      </Section>

      <Section title="Albums" description={`Released by ${artist.name}`}>
        <AlbumList albums={artistAlbums.items} />
      </Section>

      <Section title="Fans Like" description={`Similar to ${artist.name}`}>
        <ArtistList artists={artistRelatedArtists.artists} />
      </Section>
    </>
  )
}
