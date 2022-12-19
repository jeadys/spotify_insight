import SectionWrapper from '@/components/core/SectionWrapper'
import AlbumGrid from '@/components/grid/AlbumGrid'
import AlbumGridSkeleton from '@/components/skeleton/AlbumGridSkeleton'
import { getArtistAlbums } from '@/server/api'

export default async function RelatedAlbums({ params }: { params: { artistId: string } }) {
  const artistAlbums = await getArtistAlbums(params.artistId, 6)

  return (
    <>
      {artistAlbums ? (
        <>
          <SectionWrapper title="Popular albums">
            <AlbumGrid albums={artistAlbums.items} />
          </SectionWrapper>
        </>
      ) : (
        <AlbumGridSkeleton amount={50} />
      )}
    </>
  )
}
