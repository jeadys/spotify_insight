import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import AlbumGrid from '@/components/grid/AlbumGrid'
import CategoryGrid from '@/components/grid/CategoryGrid'
import PlaylistGrid from '@/components/grid/PlaylistGrid'
import AlbumGridSkeleton from '@/components/skeleton/AlbumGridSkeleton'
import CategoryGridSkeleton from '@/components/skeleton/CategoryGridSkeleton'
import PlaylistGridSkeleton from '@/components/skeleton/PlaylistGridSkeleton'
import { getCategories, getFeaturedPlaylists, getNewReleases } from '@/server/api'

export default async function Discover() {
  const releases = await getNewReleases(6)
  const featured = await getFeaturedPlaylists(6)
  const categories = await getCategories(6)

  return (
    <>
      <Suspense fallback={<AlbumGridSkeleton amount={6} />}>
        <SectionWrapper title="New album releases" seeAll="/discover/new-releases">
          <AlbumGrid albums={releases.albums.items} />
        </SectionWrapper>
      </Suspense>

      <Suspense fallback={<PlaylistGridSkeleton amount={6} />}>
        <SectionWrapper title="Featured playlists" seeAll="/discover/featured-playlists">
          <PlaylistGrid playlists={featured.playlists.items} />
        </SectionWrapper>
      </Suspense>

      <Suspense fallback={<CategoryGridSkeleton amount={6} />}>
        <SectionWrapper title="Categories" seeAll="/discover/categories">
          <CategoryGrid categories={categories.categories.items} />
        </SectionWrapper>
      </Suspense>
    </>
  )
}
