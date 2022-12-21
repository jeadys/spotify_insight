import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import PlaylistGrid from '@/components/grid/PlaylistGrid'
import PlaylistGridSkeleton from '@/components/skeleton/PlaylistGridSkeleton'
import { getCategoryPlaylists } from '@/server/api'

export default async function Category({ params }: { params: { categoryId: string } }) {
  const categoryPlaylist = await getCategoryPlaylists(params.categoryId, 50)

  return (
    <Suspense fallback={<PlaylistGridSkeleton amount={50} />}>
      <SectionWrapper title="Playlists">
        <PlaylistGrid playlists={categoryPlaylist.playlists.items} />
      </SectionWrapper>
    </Suspense>
  )
}
