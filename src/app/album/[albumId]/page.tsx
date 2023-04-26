import { Suspense } from 'react'

import AlbumHeader from '@/components/header/AlbumHeader'
import Section from '@/components/layout/Section'
import AlbumTrackList from '@/components/track/AlbumTrackList'
import SkeletonTrackList from '@/components/track/SkeletonTrackList'
import { getAlbumById } from '@/server/api'

type Params = {
  params: {
    albumId: string
  }
}

export default async function Album({ params: { albumId } }: Params) {
  const album = await getAlbumById(albumId)

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <AlbumHeader albumId={albumId} />

      <Section title="Tracks" description={`Album tracks of ${album.name}`}>
        <Suspense fallback={<SkeletonTrackList contentAmount={10} />}>
          {/* @ts-expect-error Server Component */}
          <AlbumTrackList albumId={albumId} cover={album.images?.[2]?.url} />
        </Suspense>
      </Section>

      <Section title="Copyrights" description={`${album.name} released by ${album.label}`}>
        <div className="text-sm text-gray-300">
          {album.copyrights.map((copyright) => (
            <div key={copyright.text + copyright.type}>
              {copyright.text} {copyright.type}
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
