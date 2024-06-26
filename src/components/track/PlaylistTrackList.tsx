import { TrackArtist } from '@/components/track/TrackArtist'
import { TrackDuration } from '@/components/track/TrackDuration'
import { TrackList } from '@/components/track/TrackList'
import { TrackListItem } from '@/components/track/TrackListItem'
import { TrackName } from '@/components/track/TrackName'
import { TrackPlaybackControl } from '@/components/track/TrackPlaybackControl'
import { getPlaylistTracks } from '@/server/api/playlist'

type Props = {
  playlistId: string
}

export const PlaylistTrackList = async ({ playlistId }: Props) => {
  const playlistTracks = await getPlaylistTracks(playlistId, 100)
  if (!playlistTracks?.items?.length) return <span className="text-white">No tracks found</span>

  const uris = playlistTracks.items.map(({ track }) => track.uri)

  return (
    <TrackList>
      {playlistTracks.items.map(({ track }) => (
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

          <TrackDuration trackDuration={track.duration_ms} />
        </TrackListItem>
      ))}
    </TrackList>
  )
}
