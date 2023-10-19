import { Suspense } from 'react'

import { GenreArtistList } from '@/components/artist/GenreArtistList'
import { SkeletonArtistList } from '@/components/artist/SkeletonArtistList'
import { Section } from '@/components/layout/Section'

type Params = {
  params: {
    genreId: string
  }
}

export default async function Genre({ params: { genreId } }: Params) {
  return (
    <>
      <Section title={decodeURIComponent(genreId)} description="Associated artists">
        <Suspense fallback={<SkeletonArtistList contentAmount={12} />}>
          <GenreArtistList genreId={genreId} />
        </Suspense>
      </Section>
    </>
  )
}
