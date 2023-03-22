import Section from '@/components/layout/Section'
import AlbumList from '@/components/list/AlbumList'
import ArtistList from '@/components/list/ArtistList'
import TrackList from '@/components/list/TrackList'
import { getCurrentUserSavedTracks, getCurrentUserFollowedArtists, getCurrentUserSavedAlbums } from '@/server/api'

export default async function Library() {
  const savedTracks = await getCurrentUserSavedTracks(12)
  const savedAlbums = await getCurrentUserSavedAlbums(12)
  const followedArtists = await getCurrentUserFollowedArtists(12)

  return (
    <>
      <Section title="Saved Tracks">
        <TrackList tracks={savedTracks.items.map(({ track }) => track)} />
      </Section>

      <Section title="Saved Albums">
        <AlbumList albums={savedAlbums.items.map(({ album }) => album)} />
      </Section>

      <Section title="Followed artists">
        <ArtistList artists={followedArtists.artists.items} />
      </Section>
    </>
  )
}
