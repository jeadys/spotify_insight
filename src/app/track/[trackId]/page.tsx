import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import TrackAudioFeature from '@/components/analysis/TrackAudioFeature'
import TrackAudioFeatureChart from '@/components/analysis/TrackAudioFeatureChart'
import TrackHeader from '@/components/header/TrackHeader'
import Section from '@/components/layout/Section'
import Label from '@/components/ui/Label'
import { getAudioFeaturesForTrack, getTrackById } from '@/server/api'

export default async function Track({ params }: { params: { trackId: string } }) {
  const track = await getTrackById(params.trackId)
  const trackAudioFeatures = await getAudioFeaturesForTrack(params.trackId)

  return (
    <>
      <TrackHeader track={track} />

      <Section title="Appears on" description={`Albums featuring ${track.name}`}>
        <div className="flex flex-col">
          <Link href={`/album/${track.album.id}`}>
            <Image
              src={track.album.images?.[1]?.url || '/images/nocover.webp'}
              alt={track.album.name}
              width="0"
              height="0"
              sizes="100vw"
              className="mb-3 h-32 w-32 flex-shrink-0 rounded-md object-cover"
            />
          </Link>

          <Link href={`/album/${track.album.id}`} className="max-w-max text-white line-clamp-1 hover:underline">
            {track.album.name}
          </Link>

          <span className="flex gap-2">
            <Label value={track.album.total_tracks} icon="music" />
            <Label value={dayjs(track.album.release_date).year()} />
          </span>
        </div>
      </Section>

      <Section title="Track Analysis" description={`Audio elements of ${track.name}`}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="flex flex-col">
            <TrackAudioFeature trackAudioFeatures={trackAudioFeatures} />
          </div>
          <TrackAudioFeatureChart trackAudioFeatures={trackAudioFeatures} />
        </div>
      </Section>

      <div className="flex flex-row text-sm text-gray-300">
        <>{track.album.label}</>
      </div>
    </>
  )
}
