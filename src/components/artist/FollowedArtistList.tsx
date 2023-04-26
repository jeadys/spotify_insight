import Image from 'next/image'
import Link from 'next/link'

import ArtistGenre from '@/components/artist/ArtistGenre'
import ArtistName from '@/components/artist/ArtistName'
import List from '@/components/layout/List'
import ListItem from '@/components/layout/ListItem'
import Label from '@/components/ui/Label'
import { getCurrentUserFollowedArtists } from '@/server/api'
import { formatFollowCount } from '@/utils/formatFollowCount'

export default async function FollowedArtistList() {
  const followedArtists = await getCurrentUserFollowedArtists(12)
  if (!followedArtists?.artists?.items?.length) return <span className="text-white">No followed artists</span>

  return (
    <List>
      {followedArtists.artists.items.map((artist) => (
        <ListItem key={artist.id}>
          <Link href={`/artist/${artist.id}`} className="flex-shrink-0">
            <Image
              src={artist.images?.[2]?.url || '/images/nocover.webp'}
              alt={artist.name}
              width="0"
              height="0"
              sizes="100vw"
              className="h-24 w-24 rounded-full object-cover sm:h-32 sm:w-32"
            />
          </Link>

          <span className="sm:flex sm:flex-col">
            <ArtistName artistId={artist.id} artistName={artist.name} />

            <ArtistGenre artistGenre={artist.genres[0]} />

            <span className="flex flex-row">
              <Label value={formatFollowCount(artist.followers.total, 1)} icon="heart" />
            </span>
          </span>
        </ListItem>
      ))}
    </List>
  )
}
