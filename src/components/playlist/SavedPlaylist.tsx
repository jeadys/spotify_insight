import Image from 'next/image'
import Link from 'next/link'

import { List } from '@/components/layout/List'
import { ListItem } from '@/components/layout/ListItem'
import { PlaylistName } from '@/components/playlist/PlaylistName'
import { Label } from '@/components/ui/Label'
import { getCurrentUserSavedPlaylists } from '@/server/api'

export const SavedPlayList = async () => {
  const savedPlaylists = await getCurrentUserSavedPlaylists(12)
  if (!savedPlaylists?.items?.length) return <span className="text-white">No playlists saved</span>

  return (
    <List>
      {savedPlaylists.items.map((playlist) => (
        <ListItem key={playlist.id}>
          <Link href={`/playlist/${playlist.id}`} className="flex-shrink-0">
            <Image
              src={playlist.images?.[1]?.url || playlist.images?.[0]?.url || '/images/nocover.webp'}
              alt={playlist.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-24 w-24 rounded-md object-cover sm:h-32 sm:w-32"
            />
          </Link>

          <span className="sm:flex sm:flex-col">
            <PlaylistName playlistId={playlist.id} playlistName={playlist.name} />

            <span className="flex flex-row">
              <Label value={playlist.tracks.total} icon="music" />
            </span>
          </span>
        </ListItem>
      ))}
    </List>
  )
}
