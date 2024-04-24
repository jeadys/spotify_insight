import dayjs from 'dayjs'
import Image from 'next/image'
import Link from 'next/link'

import { AlbumName } from '@/components/album/AlbumName'
import { List } from '@/components/layout/List'
import { ListItem } from '@/components/layout/ListItem'
import { Label } from '@/components/ui/Label'
import { getNewReleases } from '@/server/api/discovery'

export const NewAlbumList = async () => {
  const newReleases = await getNewReleases(50)
  if (!newReleases?.albums?.items?.length) return <span className="text-white">No albums found</span>

  return (
    <List>
      {newReleases.albums.items.map((album) => (
        <ListItem key={album.id}>
          <Link href={`/album/${album.id}`} className="flex-shrink-0">
            <Image
              src={album.images?.[1]?.url || '/images/nocover.webp'}
              alt={album.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-24 w-24 rounded-md object-cover sm:h-32 sm:w-32"
            />
          </Link>

          <span className="sm:flex sm:flex-col">
            <AlbumName albumId={album.id} albumName={album.name} />

            <span className="flex flex-row">
              <Label value={album.total_tracks} icon="music" />
              <Label value={dayjs(album.release_date).year()} />
            </span>
          </span>
        </ListItem>
      ))}
    </List>
  )
}
