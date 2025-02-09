import { Suspense } from 'react'

import { AlbumCopyright } from '@/components/album/AlbumCopyright'
import { AlbumAudioFeature } from '@/components/analysis/AlbumAudioFeature'
import { AlbumHeader } from '@/components/header/AlbumHeader'
import { SkeletonHeader } from '@/components/header/SkeletonHeader'
import { Section } from '@/components/layout/Section'
import { SkeletonAudioFeature } from '@/components/skeleton/SkeletonAudioFeature'
import { AlbumTrackList } from '@/components/track/AlbumTrackList'
import { SkeletonTrackList } from '@/components/track/SkeletonTrackList'
import { getAlbumById } from '@/server/api/album'

type Params = {
  params: {
    albumId: string
  }
}

export default async function Album({ params: { albumId } }: Params) {
  const album = await getAlbumById(albumId)

  return (
    <>
      <Suspense fallback={<SkeletonHeader imageShape="square" />}>
        <AlbumHeader albumId={albumId} />
      </Suspense>

      {/* <Section title="Album Analysis" description={`Audio elements of ${album.name}`}>
        <Suspense fallback={<SkeletonAudioFeature contentAmount={6} />}>
        <AlbumAudioFeature albumId={albumId} />
        </Suspense>
      </Section> */}

      <Section title="Tracks" description={`Album tracks of ${album.name}`}>
        <Suspense fallback={<SkeletonTrackList contentAmount={10} />}>
          <AlbumTrackList albumId={albumId} cover={album.images?.[2]?.url} />
        </Suspense>
      </Section>

      <Section title="Copyrights" description={`${album.name} released by ${album.label}`}>
        <Suspense
          fallback={
            <ul className="flex flex-col gap-2">
              <li className="h-4 w-72 rounded-md bg-gray-1200"></li>
              <li className="h-4 w-72 rounded-md bg-gray-1200"></li>
            </ul>
          }
        >
          <AlbumCopyright albumId={albumId} />
        </Suspense>
      </Section>
    </>
  )
}
