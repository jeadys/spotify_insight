import { getAlbumById } from '@/server/api/album'

type Props = {
  albumId: string
}

export const AlbumCopyright = async ({ albumId }: Props) => {
  const album = await getAlbumById(albumId)

  return (
    <div className="text-sm text-gray-300">
      {album.copyrights.map((copyright) => (
        <div key={copyright.text + copyright.type}>
          {copyright.text} {copyright.type}
        </div>
      ))}
    </div>
  )
}
