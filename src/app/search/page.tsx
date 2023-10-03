import { Suspense } from 'react'

import NewAlbumList from '@/components/album/NewAlbumList'
import SkeletonAlbumList from '@/components/album/SkeletonAlbumList'
import Section from '@/components/layout/Section'

export default async function page() {
  return (
    <Section title="New Releases" description="Albums to explore">
      <Suspense fallback={<SkeletonAlbumList contentAmount={50} />}>
        {/* @ts-expect-error Server Component */}
        <NewAlbumList />
      </Suspense>
    </Section>
  )
}
