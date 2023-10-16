/* eslint-disable camelcase */

import dayjs from 'dayjs'

import { TrackAlbum } from '@/components/track/TrackAlbum'
import { TrackArtist } from '@/components/track/TrackArtist'
import { TrackList } from '@/components/track/TrackList'
import { TrackListItem } from '@/components/track/TrackListItem'
import { TrackName } from '@/components/track/TrackName'
import { TrackPlaybackControl } from '@/components/track/TrackPlaybackControl'
import { TrackPlayedAt } from '@/components/track/TrackPlayedAt'
import { getRecentlyPlayedTracks } from '@/server/api'

type TracksByDay = {
  [date: string]: { track: SpotifyApi.TrackObjectFull; played_at: string; index: number }[]
}

export const RecentTrackList = async () => {
  const recentTracks = await getRecentlyPlayedTracks(50)
  if (!recentTracks?.items?.length) return <span className="text-white">No tracks found</span>

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

          <TrackList>
            {tracks.map(({ track, played_at }) => (
              <TrackListItem key={track.id + played_at}>
                <TrackPlaybackControl
                  trackImage={track.album?.images?.[2]?.url}
                  trackName={track.name}
                  trackUri={track.uri}
                  trackUris={[track.uri]}
                />

                <span className="flex-grow">
                  <TrackName trackId={track.id} trackName={track.name} />
                  <TrackArtist artistId={track.artists[0].id} artistName={track.artists[0].name} />
                </span>

                <TrackAlbum albumId={track.album.id} albumName={track.album.name} />

                <TrackPlayedAt playedAt={played_at} />
              </TrackListItem>
            ))}
          </TrackList>
        </article>
      ))}
    </>
  )
}
