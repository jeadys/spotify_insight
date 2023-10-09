import TrackAlbum from '@/components/track/TrackAlbum'
import TrackArtist from '@/components/track/TrackArtist'
import TrackDuration from '@/components/track/TrackDuration'
import TrackList from '@/components/track/TrackList'
import TrackListItem from '@/components/track/TrackListItem'
import TrackName from '@/components/track/TrackName'
import TrackPlaybackControl from '@/components/track/TrackPlaybackControl'
import { getSearchItems } from '@/server/api'

type Props = {
  searchTerm: string
}

export default async function SearchTrackList({ searchTerm }: Props) {
  const searchResult = await getSearchItems(searchTerm, 12)
  if (!searchResult?.tracks?.items?.length) return <span className="text-white">No tracks found</span>

  const uris = searchResult.tracks.items.map((track) => track.uri)

  return (
    <TrackList>
      {searchResult.tracks.items.map((track) => (
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
