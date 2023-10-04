import { Suspense } from 'react'

import ArtistAlbumList from '@/components/album/ArtistAlbumList'
import SkeletonAlbumList from '@/components/album/SkeletonAlbumList'
import ArtistRelatedArtistList from '@/components/artist/ArtistRelatedArtistList'
import SkeletonArtistList from '@/components/artist/SkeletonArtistList'
import ArtistGenreList from '@/components/genre/ArtistGenreList'
import SkeletonGenreList from '@/components/genre/SkeletonGenreList'
import ArtistHeader from '@/components/header/ArtistHeader'
import Section from '@/components/layout/Section'
import ArtistTrackList from '@/components/track/ArtistTrackList'
import SkeletonTrackList from '@/components/track/SkeletonTrackList'
import { getArtistById } from '@/server/api'

type Params = {
  params: {
    artistId: string
  }
}

export default async function Artist({ params: { artistId } }: Params) {
  const artist = await getArtistById(artistId)

  return (
    <>
      <ArtistHeader artistId={artistId} />

      <Section title="Genres" description={`Associated with ${artist.name}`}>
        <Suspense fallback={<SkeletonGenreList contentAmount={5} />}>
          <ArtistGenreList artistId={artistId} />
        </Suspense>
      </Section>

      <Section title="Tracks" description={`Released by ${artist.name}`}>
        <Suspense fallback={<SkeletonTrackList contentAmount={10} />}>
          <ArtistTrackList artistId={artistId} />
        </Suspense>
      </Section>

      <Section title="Albums" description={`Released by ${artist.name}`}>
        <Suspense fallback={<SkeletonAlbumList contentAmount={12} />}>
          <ArtistAlbumList artistId={artistId} />
        </Suspense>
      </Section>

      <Section title="Fans Like" description={`Similar to ${artist.name}`}>
        <Suspense fallback={<SkeletonArtistList contentAmount={12} />}>
          <ArtistRelatedArtistList artistId={artistId} />
        </Suspense>
      </Section>
    </>
  )
}
