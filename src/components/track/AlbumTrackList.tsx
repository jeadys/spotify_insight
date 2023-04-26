import React from 'react'

import Image from 'next/image'

import PlaybackHandle from '@/components/playback/PlaybackHandle'
import TrackArtist from '@/components/track/TrackArtist'
import TrackDuration from '@/components/track/TrackDuration'
import TrackName from '@/components/track/TrackName'
import { getAlbumTracks } from '@/server/api'

type Props = {
  albumId: string
  cover: string
}

export default async function AlbumTrackList({ albumId, cover }: Props) {
  const albumTracks = await getAlbumTracks(albumId, 50)
  if (!albumTracks?.items?.length) return <span className="text-white">No tracks found</span>

  const trackQueue = albumTracks.items.map((track) => track.uri)

  return (
    <ul className="w-full">
      {albumTracks.items.map((track) => (
        <li key={track.id} className="group flex items-center gap-5 p-2 hover:bg-gray-1200">
          <div className="relative flex flex-shrink-0 items-center justify-center">
            <Image
              src={cover || '/images/nocover.webp'}
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

          <TrackDuration trackDuration={track.duration_ms} />
        </li>
      ))}
    </ul>
  )
}
