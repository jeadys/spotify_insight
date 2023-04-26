import Image from 'next/image'

import PlaybackHandle from '@/components/playback/PlaybackHandle'
import TrackAlbum from '@/components/track/TrackAlbum'
import TrackArtist from '@/components/track/TrackArtist'
import TrackDuration from '@/components/track/TrackDuration'
import TrackName from '@/components/track/TrackName'
import { getSearchItems } from '@/server/api'

type Props = {
  searchTerm: string
}

export default async function SearchTrackList({ searchTerm }: Props) {
  const searchResult = await getSearchItems(searchTerm, 12)
  if (!searchResult?.tracks?.items?.length) return <span className="text-white">No tracks found</span>

  const trackQueue = searchResult.tracks.items.map((track) => track.uri)

  return (
    <ul className="w-full">
      {searchResult.tracks.items.map((track) => (
        <li key={track.id} className="group flex items-center gap-5 p-2 hover:bg-gray-1200">
          <div className="relative flex flex-shrink-0 items-center justify-center">
            <Image
              src={track.album?.images?.[2]?.url || '/images/nocover.webp'}
              alt={track.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-10 w-10 rounded-md object-cover group-hover:blur-xs"
            />

            <PlaybackHandle uri={track.uri} queue={trackQueue} />
          </div>

          <span className="flex-grow">
            <TrackName trackId={track.id} trackName={track.name} />
            <TrackArtist artistId={track.artists[0].id} artistName={track.artists[0].name} />
          </span>

          <TrackAlbum albumId={track.album.id} albumName={track.album.name} />

          <TrackDuration trackDuration={track.duration_ms} />
        </li>
      ))}
    </ul>
  )
}