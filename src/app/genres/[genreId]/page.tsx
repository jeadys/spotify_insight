import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import ArtistGrid from '@/components/grid/ArtistGrid'
import PlaylistGridSkeleton from '@/components/skeleton/PlaylistGridSkeleton'
import { getArtistBasedOnGenre } from '@/server/api'

export default async function Genre({ params }: { params: { genreId: string } }) {
  const genreArtists = await getArtistBasedOnGenre(params.genreId.replace(/%20/g, '-'), 50)

  return (
    <>
      {genreArtists.artists && (
        <>
          <Suspense fallback={<PlaylistGridSkeleton amount={50} />}>
            <SectionWrapper title="Artists">
              <ArtistGrid artists={genreArtists.artists.items.sort((a, b) => b.popularity - a.popularity)} />
            </SectionWrapper>
          </Suspense>
        </>
      )}
    </>
  )
}
