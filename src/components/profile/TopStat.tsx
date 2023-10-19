'use client'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { TopItem } from '@/components/profile/TopItem'
import { useTopTracks } from '@/hooks/query/useTopTracks'
import { formatTrackDuration } from '@/utils/formatTrackDuration'

dayjs.extend(relativeTime)

export const TopStat = () => {
  const topTracks = useTopTracks()
  if (!topTracks?.items?.length) return <span className="text-white">No stats found</span>

  const initialTrack = topTracks.items[0]

  const { highestPopularity, lowestPopularity, highestDuration, lowestDuration, newestRelease, oldestRelease } = topTracks.items.reduce(
    (prevTrack, currTrack) => ({
      highestPopularity: currTrack.popularity > prevTrack.highestPopularity.popularity ? currTrack : prevTrack.highestPopularity,
      lowestPopularity: currTrack.popularity < prevTrack.lowestPopularity.popularity ? currTrack : prevTrack.lowestPopularity,
      highestDuration: currTrack.duration_ms > prevTrack.highestDuration.duration_ms ? currTrack : prevTrack.highestDuration,
      lowestDuration: currTrack.duration_ms < prevTrack.lowestDuration.duration_ms ? currTrack : prevTrack.lowestDuration,
      newestRelease: currTrack.album.release_date > prevTrack.newestRelease.album.release_date ? currTrack : prevTrack.newestRelease,
      oldestRelease: currTrack.album.release_date < prevTrack.oldestRelease.album.release_date ? currTrack : prevTrack.oldestRelease,
    }),
    {
      highestPopularity: initialTrack,
      lowestPopularity: initialTrack,
      highestDuration: initialTrack,
      lowestDuration: initialTrack,
      newestRelease: initialTrack,
      oldestRelease: initialTrack,
    }
  )

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-3">
      <ul className="flex flex-col gap-5">
        <TopItem
          type="popularity"
          title="Most Popular"
          value={(highestPopularity.popularity / 10).toString()}
          trackArtist={highestPopularity.artists[0].name}
          trackName={highestPopularity.name}
          trackImage={highestPopularity.album.images?.[0]?.url}
        />

        <TopItem
          type="popularity"
          title="Most Obscure"
          value={(lowestPopularity.popularity / 10).toString()}
          trackArtist={lowestPopularity.artists[0].name}
          trackName={lowestPopularity.name}
          trackImage={lowestPopularity.album.images?.[0]?.url}
        />
      </ul>

      <ul className="flex flex-col gap-5">
        <TopItem
          type="release"
          title="Newest"
          value={newestRelease.album.release_date}
          trackArtist={newestRelease.artists[0].name}
          trackName={newestRelease.name}
          trackImage={newestRelease.album.images?.[0]?.url}
        />

        <TopItem
          type="release"
          title="oldest"
          value={oldestRelease.album.release_date}
          trackArtist={oldestRelease.artists[0].name}
          trackName={oldestRelease.name}
          trackImage={oldestRelease.album.images?.[0]?.url}
        />
      </ul>

      <ul className="flex flex-col gap-5">
        <TopItem
          type="duration"
          title="Longest"
          value={formatTrackDuration(highestDuration.duration_ms)}
          trackArtist={highestDuration.artists[0].name}
          trackName={highestDuration.name}
          trackImage={highestDuration.album.images?.[0]?.url}
        />

        <TopItem
          type="duration"
          title="Shortest"
          value={formatTrackDuration(lowestDuration.duration_ms)}
          trackArtist={lowestDuration.artists[0].name}
          trackName={lowestDuration.name}
          trackImage={lowestDuration.album.images?.[0]?.url}
        />
      </ul>
    </div>
  )
}
