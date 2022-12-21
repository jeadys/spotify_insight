import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import AlbumGrid from '@/components/grid/AlbumGrid'
import AlbumGridSkeleton from '@/components/skeleton/AlbumGridSkeleton'
import { getArtistAlbums } from '@/server/api'

export default async function RelatedAlbums({ params }: { params: { artistId: string } }) {
  const artistAlbums = await getArtistAlbums(params.artistId, 50)

  return (
    <Suspense fallback={<AlbumGridSkeleton amount={50} />}>
      <SectionWrapper title="Popular albums">
        <AlbumGrid albums={artistAlbums.items} />
      </SectionWrapper>
    </Suspense>
  )
}
