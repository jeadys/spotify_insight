import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { TopItem } from '@/components/profile/TopItem'
import { getTopTracks } from '@/server/api/user'

dayjs.extend(relativeTime)

type Props = {
  timeRange: string
}

export const TopStat = async ({ timeRange }: Props) => {
  const topTracks = await getTopTracks(timeRange, 12)
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
        <TopItem type="popularity" title="Most Popular" track={highestPopularity} />
        <TopItem type="popularity" title="Most Obscure" track={lowestPopularity} />
      </ul>

      <ul className="flex flex-col gap-5">
        <TopItem type="release" title="Newest" track={newestRelease} />
        <TopItem type="release" title="oldest" track={oldestRelease} />
      </ul>

      <ul className="flex flex-col gap-5">
        <TopItem type="duration" title="Longest" track={highestDuration} />
        <TopItem type="duration" title="Shortest" track={lowestDuration} />
      </ul>
    </div>
  )
}
