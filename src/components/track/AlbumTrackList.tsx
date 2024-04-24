import { TrackArtist } from '@/components/track/TrackArtist'
import { TrackDuration } from '@/components/track/TrackDuration'
import { TrackList } from '@/components/track/TrackList'
import { TrackListItem } from '@/components/track/TrackListItem'
import { TrackName } from '@/components/track/TrackName'
import { TrackPlaybackControl } from '@/components/track/TrackPlaybackControl'
import { getAlbumTracks } from '@/server/api/album'

type Props = {
  albumId: string
  cover: string
}

export const AlbumTrackList = async ({ albumId, cover }: Props) => {
  const albumTracks = await getAlbumTracks(albumId, 50)
  if (!albumTracks?.items?.length) return <span className="text-white">No tracks found</span>

  const uris = albumTracks.items.map((track) => track.uri)

  return (
    <TrackList>
      {albumTracks.items.map((track) => (
        <TrackListItem key={track.id}>
          <TrackPlaybackControl showPlaybackControls trackImage={cover} trackName={track.name} trackUri={track.uri} trackUris={uris} />

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
