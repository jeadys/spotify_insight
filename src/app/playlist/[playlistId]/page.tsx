import { Suspense } from 'react'

import PlaylistHeader from '@/components/header/PlaylistHeader'
import Section from '@/components/layout/Section'
import PlaylistTrackList from '@/components/track/PlaylistTrackList'
import SkeletonTrackList from '@/components/track/SkeletonTrackList'
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
      {/* @ts-expect-error Server Component */}
      <PlaylistHeader playlistId={playlistId} />

      <Section title="Tracks" description={`Playlist tracks of ${playlist.name}`}>
        <Suspense fallback={<SkeletonTrackList contentAmount={10} />}>
          {/* @ts-expect-error Server Component */}
          <PlaylistTrackList playlistId={playlistId} cover={playlist.images?.[2]?.url} />
        </Suspense>
      </Section>
    </>
  )
}
