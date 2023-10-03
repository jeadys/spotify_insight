import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import TrackAudioFeatureChart from '@/components/analysis/TrackAudioFeatureChart'
import TrackAudioFeatureProgressBar from '@/components/analysis/TrackAudioFeatureProgressBar'
import TrackAudioFeatureStatistics from '@/components/analysis/TrackAudioFeatureStatistics'
import TrackHeader from '@/components/header/TrackHeader'
import Section from '@/components/layout/Section'
import Label from '@/components/ui/Label'
import { getAudioFeaturesForTrack, getTrackById } from '@/server/api'

type Params = {
  params: {
    trackId: string
  }
}

export default async function Track({ params: { trackId } }: Params) {
  const track = await getTrackById(trackId)
  const trackAudioFeatures = await getAudioFeaturesForTrack(trackId)

  return (
    <>
      <TrackHeader track={track} />

      <Section title="Appears on" description={`Albums featuring ${track.name}`}>
        <div className="flex max-w-max flex-row items-center gap-5 sm:flex-col sm:items-start">
          <Link href={`/album/${track.album.id}`} className="flex-shrink-0">
            <Image
              src={track.album.images?.[1]?.url || '/images/nocover.webp'}
              alt={track.album.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-24 w-24 rounded-md object-cover sm:h-32 sm:w-32"
            />
          </Link>

          <span className="sm:flex sm:flex-col">
            <Link href={`/album/${track.album.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
              {track.album.name}
            </Link>

            <span className="flex flex-row">
              <Label value={track.album.total_tracks} icon="music" />
              <Label value={dayjs(track.album.release_date).year()} />
            </span>
          </span>
        </div>
      </Section>

      {trackAudioFeatures && (
        <Section title="Track Analysis" description={`Audio elements of ${track.name}`}>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <TrackAudioFeatureProgressBar trackAudioFeatures={trackAudioFeatures} />
              <TrackAudioFeatureStatistics trackAudioFeatures={trackAudioFeatures} />
            </div>
            <TrackAudioFeatureChart trackAudioFeatures={trackAudioFeatures} />
          </div>
        </Section>
      )}
    </>
  )
}
