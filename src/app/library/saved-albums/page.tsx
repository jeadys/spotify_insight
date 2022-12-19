import SectionWrapper from '@/components/core/SectionWrapper'
import AlbumGrid from '@/components/grid/AlbumGrid'
import AlbumGridSkeleton from '@/components/skeleton/AlbumGridSkeleton'
import { getCurrentUserSavedAlbums } from '@/server/api'

export default async function SavedAlbums() {
  const savedAlbums = await getCurrentUserSavedAlbums(50)

  return (
    <>
      {savedAlbums ? (
        <>
          <SectionWrapper title="Saved albums">
            <AlbumGrid albums={savedAlbums.items.map(({ album }) => album)} />
          </SectionWrapper>
        </>
      ) : (
        <AlbumGridSkeleton amount={50} />
      )}
    </>
  )
}
