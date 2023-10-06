import TrackAlbum from '@/components/track/TrackAlbum'
import TrackArtist from '@/components/track/TrackArtist'
import TrackDuration from '@/components/track/TrackDuration'
import TrackList from '@/components/track/TrackList'
import TrackListItem from '@/components/track/TrackListItem'
import TrackName from '@/components/track/TrackName'
import TrackPlaybackControl from '@/components/track/TrackPlaybackControl'
import { getCurrentUserSavedTracks } from '@/server/api'

export default async function SavedTrackList() {
  const savedTracks = await getCurrentUserSavedTracks(12)
  if (!savedTracks?.items?.length) return <span className="text-white">No tracks found</span>

  const uris = savedTracks.items.map(({ track }) => track.uri)

  return (
    <TrackList>
      {savedTracks.items.map(({ track }) => (
        <TrackListItem key={track.id}>
          <TrackPlaybackControl
            showPlaybackControls
            trackImage={track.album?.images?.[2]?.url}
            trackName={track.name}
            trackUri={track.uri}
            trackUris={uris}
          />

          <span className="flex-grow">
            <TrackName trackId={track.id} trackName={track.name} />
            <TrackArtist artistId={track.artists[0].id} artistName={track.artists[0].name} />
          </span>

          <TrackAlbum albumId={track.album.id} albumName={track.album.name} />

          <TrackDuration trackDuration={track.duration_ms} />
        </TrackListItem>
      ))}
    </TrackList>
  )
}
