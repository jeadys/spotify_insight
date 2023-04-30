/* eslint-disable camelcase */
import React from 'react'

import dayjs from 'dayjs'
import Image from 'next/image'

import PlaybackHandle from '@/components/playback/PlaybackHandle'
import TrackAlbum from '@/components/track/TrackAlbum'
import TrackArtist from '@/components/track/TrackArtist'
import TrackName from '@/components/track/TrackName'
import TrackPlayedAt from '@/components/track/TrackStream'
import { getRecentlyPlayedTracks } from '@/server/api'

type TracksByDay = {
  [date: string]: { track: SpotifyApi.TrackObjectFull; played_at: string; index: number }[]
}

export default async function RecentTrackList() {
  const recentTracks = await getRecentlyPlayedTracks(50)
  if (!recentTracks?.items?.length) return <span className="text-white">No tracks found</span>

  const trackQueue = recentTracks.items.map(({ track }) => track.uri)

  const tracksByDay = recentTracks.items.reduce((acc: TracksByDay, { track, played_at }, index) => {
    const date = dayjs(played_at).format('MMMM DD, YYYY')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push({ track, played_at, index })
    return acc
  }, {})

  return (
    <>
      {Object.entries(tracksByDay).map(([date, tracks]) => (
        <article key={date}>
          <h4 className="my-5 font-semibold text-white">{date}</h4>

          <ul className="w-full">
            {tracks.map(({ track, played_at }) => (
              <li key={track.id + played_at} className="group flex items-center gap-5 p-2 hover:bg-gray-1200">
                <div className="relative flex flex-shrink-0 items-center justify-center">
                  <Image
                    src={track.album?.images?.[2]?.url || '/images/nocover.webp'}
                    alt={track.name}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-10 w-10 rounded-md object-cover group-hover:blur-xs"
                  />

                  {/* <PlaybackHandle uri={track.uri} queue={trackQueue} /> */}
                </div>

                <span className="flex-grow">
                  <TrackName trackId={track.id} trackName={track.name} />
                  <TrackArtist artistId={track.artists[0].id} artistName={track.artists[0].name} />
                </span>

                <TrackAlbum albumId={track.album.id} albumName={track.album.name} />

                <TrackPlayedAt playedAt={played_at} />
              </li>
            ))}
          </ul>
        </article>
      ))}
    </>
  )
}
