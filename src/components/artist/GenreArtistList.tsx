import Image from 'next/image'
import Link from 'next/link'

import ArtistName from '@/components/artist/ArtistName'
import List from '@/components/layout/List'
import ListItem from '@/components/layout/ListItem'
import Label from '@/components/ui/Label'
import { getArtistBasedOnGenre } from '@/server/api'
import { formatFollowCount } from '@/utils/formatFollowCount'

type Props = {
  id: string
}

export default async function GenreArtistList({ id }: Props) {
  const artistBasedOnGenre = await getArtistBasedOnGenre(id.replace(/%20/g, '-'), 50)
  if (!artistBasedOnGenre?.artists?.items?.length) return <span className="text-white">No artists found</span>

  const fileteredArtistBasedOnGenre = artistBasedOnGenre.artists.items
    .filter((a) => a.genres.includes(decodeURIComponent(id)))
    .sort((a, b) => b.popularity - a.popularity)

  return (
    <List>
      {fileteredArtistBasedOnGenre.map((artist) => (
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

            <span className="flex flex-row">
              <Label value={formatFollowCount(artist.followers.total, 1)} icon="heart" />
            </span>
          </span>
        </ListItem>
      ))}
    </List>
  )
}
