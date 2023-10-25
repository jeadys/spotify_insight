import { Suspense } from 'react'

import { PlaylistAudioFeature } from '@/components/analysis/PlaylistAudioFeature'
import { PlaylistHeader } from '@/components/header/PlaylistHeader'
import { SkeletonHeader } from '@/components/header/SkeletonHeader'
import { Section } from '@/components/layout/Section'
import { SkeletonAudioFeature } from '@/components/skeleton/SkeletonAudioFeature'
import { PlaylistTrackList } from '@/components/track/PlaylistTrackList'
import { SkeletonTrackList } from '@/components/track/SkeletonTrackList'
import { getPlaylistById } from '@/server/api'

type Params = {
  params: {
    playlistId: string
  }
}

export default async function Album({ params: { playlistId } }: Params) {
  const playlist = await getPlaylistById(playlistId)

  return (
    <>
      <Suspense fallback={<SkeletonHeader imageShape="square" />}>
        <PlaylistHeader playlistId={playlistId} />
      </Suspense>

      <Section title="Playlist Analysis" description={`Audio elements of ${playlist.name}`}>
        <Suspense fallback={<SkeletonAudioFeature contentAmount={6} />}>
          <PlaylistAudioFeature playlistId={playlistId} />
        </Suspense>
      </Section>

      <Section title="Tracks" description={`Playlist tracks of ${playlist.name}`}>
        <Suspense fallback={<SkeletonTrackList contentAmount={10} />}>
          <PlaylistTrackList playlistId={playlistId} />
        </Suspense>
      </Section>
    </>
  )
}
