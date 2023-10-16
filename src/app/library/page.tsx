import { Suspense } from 'react'

import { SavedAlbumList } from '@/components/album/SavedAlbumList'
import { SkeletonAlbumList } from '@/components/album/SkeletonAlbumList'
import { FollowedArtistList } from '@/components/artist/FollowedArtistList'
import { SkeletonArtistList } from '@/components/artist/SkeletonArtistList'
import { Section } from '@/components/layout/Section'
import { SavedPlayList } from '@/components/playlist/SavedPlaylist'
import { SavedTrackList } from '@/components/track/SavedTrackList'
import { SkeletonTrackList } from '@/components/track/SkeletonTrackList'

export default async function Library() {
  return (
    <>
      <Section title="Saved Playlists">
        <Suspense fallback={<SkeletonAlbumList contentAmount={12} />}>
          <SavedPlayList />
        </Suspense>
      </Section>

      <Section title="Saved Albums">
        <Suspense fallback={<SkeletonAlbumList contentAmount={12} />}>
          <SavedAlbumList />
        </Suspense>
      </Section>

      <Section title="Saved Tracks">
        <Suspense fallback={<SkeletonTrackList contentAmount={12} />}>
          <SavedTrackList />
        </Suspense>
      </Section>

      <Section title="Followed artists">
        <Suspense fallback={<SkeletonArtistList contentAmount={12} />}>
          <FollowedArtistList />
        </Suspense>
      </Section>
    </>
  )
}
