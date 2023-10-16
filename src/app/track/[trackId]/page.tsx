import { Suspense } from 'react'

import { RelatedAlbum } from '@/components/album/RelatedAlbum'
import { SkeletonAlbumList } from '@/components/album/SkeletonAlbumList'
import { TrackAudioFeature } from '@/components/analysis/TrackAudioFeature'
import { SkeletonHeader } from '@/components/header/SkeletonHeader'
import { TrackHeader } from '@/components/header/TrackHeader'
import { Section } from '@/components/layout/Section'
import { SkeletonAudioFeature } from '@/components/skeleton/SkeletonAudioFeature'
import { getTrackById } from '@/server/api'

type Params = {
  params: {
    trackId: string
  }
}

export default async function Track({ params: { trackId } }: Params) {
  const track = await getTrackById(trackId)

  return (
    <>
      <Suspense fallback={<SkeletonHeader imageShape="square" />}>
        <TrackHeader trackId={trackId} />
      </Suspense>

      <Section title="Appears on" description={`Albums featuring ${track.name}`}>
        <Suspense fallback={<SkeletonAlbumList contentAmount={1} />}>
          <RelatedAlbum trackId={trackId} />
        </Suspense>
      </Section>

      <Section title="Track Analysis" description={`Audio elements of ${track.name}`}>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                <SkeletonAudioFeature contentAmount={6} />
                <ul className="grid w-full grid-cols-2 gap-5 lg:grid-cols-3">
                  <li className="h-24 rounded-md bg-gray-1200 p-5 text-center capitalize sm:h-28"></li>
                  <li className="h-24 rounded-md bg-gray-1200 p-5 text-center capitalize sm:h-28"></li>
                  <li className="h-24 rounded-md bg-gray-1200 p-5 text-center capitalize sm:h-28"></li>
                  <li className="h-24 rounded-md bg-gray-1200 p-5 text-center capitalize sm:h-28"></li>
                  <li className="h-24 rounded-md bg-gray-1200 p-5 text-center capitalize sm:h-28"></li>
                  <li className="h-24 rounded-md bg-gray-1200 p-5 text-center capitalize sm:h-28"></li>
                  <li className="h-24 rounded-md bg-gray-1200 p-5 text-center capitalize sm:h-28"></li>
                </ul>
              </div>
            </div>
          }
        >
          <TrackAudioFeature trackId={trackId} />
        </Suspense>
      </Section>
    </>
  )
}
