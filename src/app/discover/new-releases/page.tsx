import SectionWrapper from '@/components/core/SectionWrapper'
import AlbumGrid from '@/components/grid/AlbumGrid'
import AlbumGridSkeleton from '@/components/skeleton/AlbumGridSkeleton'
import { getNewReleases } from '@/server/api'

export default async function NewReleases() {
  const releases = await getNewReleases(50)
  return (
    <>
      {releases ? (
        <>
          <SectionWrapper title="New album releases">
            <AlbumGrid albums={releases.albums.items} />
          </SectionWrapper>
        </>
      ) : (
        <AlbumGridSkeleton amount={50} />
      )}
    </>
  )
}
