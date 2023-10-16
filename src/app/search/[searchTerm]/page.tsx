import { Suspense } from 'react'

import { SearchAlbumList } from '@/components/album/SearchAlbumList'
import { SkeletonAlbumList } from '@/components/album/SkeletonAlbumList'
import { SearchArtistList } from '@/components/artist/SearchArtistList'
import { SkeletonArtistList } from '@/components/artist/SkeletonArtistList'
import { Section } from '@/components/layout/Section'
import { SearchTrackList } from '@/components/track/SearchTrackList'
import { SkeletonTrackList } from '@/components/track/SkeletonTrackList'

type Params = {
  params: {
    searchTerm: string
  }
}

export default async function SearchResult({ params: { searchTerm } }: Params) {
  return (
    <>
      <Section title="Artists" description={`Result based on ${searchTerm}`}>
        <Suspense fallback={<SkeletonArtistList contentAmount={10} />}>
          <SearchArtistList searchTerm={searchTerm} />
        </Suspense>
      </Section>

      <Section title="Albums" description={`Result based on ${searchTerm}`}>
        <Suspense fallback={<SkeletonAlbumList contentAmount={10} />}>
          <SearchAlbumList searchTerm={searchTerm} />
        </Suspense>
      </Section>

      <Section title="Tracks" description={`Result based on ${searchTerm}`}>
        <Suspense fallback={<SkeletonTrackList contentAmount={12} />}>
          <SearchTrackList searchTerm={searchTerm} />
        </Suspense>
      </Section>
    </>
  )
}
