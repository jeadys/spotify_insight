'use client'

import Link from 'next/link'

import TrackPlaybackControl from '@/components/track/TrackPlaybackControl'
import useTopTracks from '@/hooks/query/useTopTracks'

export default function TopTrack() {
  const topTracks = useTopTracks()
  if (!topTracks?.items?.length) return <span className="text-white">No tracks found</span>

  const uris = topTracks.items.map((track) => track.uri)

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-3">
      {topTracks.items.map((track) => (
        <li key={track.id} className="group flex flex-row items-center gap-5">
          <TrackPlaybackControl
            showPlaybackControls
            trackImage={track.album?.images?.[2]?.url}
            trackName={track.name}
            trackUri={track.uri}
            trackUris={uris}
          />

          <span className="flex flex-col">
            <Link href={`/track/${track.id}`} className="line-clamp-1 max-w-max break-all text-white hover:underline">
              {track.name}
            </Link>
            <Link href={`/artist/${track.artists[0].id}`} className="line-clamp-1 max-w-max break-all text-gray-400 hover:underline">
              {track.artists[0].name}
            </Link>
          </span>
        </li>
      ))}
    </ul>
  )
}
