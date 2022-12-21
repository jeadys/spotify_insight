import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import ArtistGrid from '@/components/grid/ArtistGrid'
import ArtistGridSkeleton from '@/components/skeleton/ArtistGridSkeleton'
import { getArtistRelatedArtists } from '@/server/api'

export default async function RelatedArtists({ params }: { params: { artistId: string } }) {
  const artistRelatedArtists = await getArtistRelatedArtists(params.artistId)

  return (
    <Suspense fallback={<ArtistGridSkeleton amount={50} />}>
      <SectionWrapper title="Fans also like">
        <ArtistGrid artists={artistRelatedArtists.artists} />
      </SectionWrapper>
    </Suspense>
  )
}
