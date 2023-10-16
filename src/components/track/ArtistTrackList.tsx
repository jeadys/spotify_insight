import { TrackAlbum } from '@/components/track/TrackAlbum'
import { TrackDuration } from '@/components/track/TrackDuration'
import { TrackList } from '@/components/track/TrackList'
import { TrackListItem } from '@/components/track/TrackListItem'
import { TrackName } from '@/components/track/TrackName'
import { TrackPlaybackControl } from '@/components/track/TrackPlaybackControl'
import { getArtistTopTracks } from '@/server/api'

type Props = {
  artistId: string
}

export const ArtistTrackList = async ({ artistId }: Props) => {
  const artistTopTracks = await getArtistTopTracks(artistId)
  if (!artistTopTracks?.tracks?.length) return <span className="text-white">No tracks found</span>

  const uris = artistTopTracks.tracks.map((track) => track.uri)

  return (
    <TrackList>
      {artistTopTracks.tracks.map((track) => (
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
          </span>

          <TrackAlbum albumId={track.album.id} albumName={track.album.name} />

          <TrackDuration trackDuration={track.duration_ms} />
        </TrackListItem>
      ))}
    </TrackList>
  )
}
