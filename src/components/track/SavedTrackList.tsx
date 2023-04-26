import Image from 'next/image'

import PlaybackHandle from '@/components/playback/PlaybackHandle'
import TrackAlbum from '@/components/track/TrackAlbum'
import TrackArtist from '@/components/track/TrackArtist'
import TrackDuration from '@/components/track/TrackDuration'
import TrackName from '@/components/track/TrackName'
import { getCurrentUserSavedTracks } from '@/server/api'

export default async function SavedTrackList() {
  const savedTracks = await getCurrentUserSavedTracks(12)
  if (!savedTracks?.items?.length) return <span className="text-white">No tracks found</span>

  const trackQueue = savedTracks.items.map(({ track }) => track.uri)

  return (
    <ul className="w-full">
      {savedTracks.items.map(({ track }) => (
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

          <td className="flex-grow">
            <TrackName trackId={track.id} trackName={track.name} />
            <TrackArtist artistId={track.artists[0].id} artistName={track.artists[0].name} />
          </td>

          <TrackAlbum albumId={track.album.id} albumName={track.album.name} />

          <TrackDuration trackDuration={track.duration_ms} />
        </li>
      ))}
    </ul>
  )
}
