import Image from 'next/image'
import Link from 'next/link'

import { ArtistName } from '@/components/artist/ArtistName'
import { List } from '@/components/layout/List'
import { ListItem } from '@/components/layout/ListItem'
import { Label } from '@/components/ui/Label'
import { getArtistBasedOnGenre } from '@/server/api/discovery'
import { formatFollowCount } from '@/utils/formatFollowCount'

type Props = {
  genreId: string
}

export const GenreArtistList = async ({ genreId }: Props) => {
  const artistBasedOnGenre = await getArtistBasedOnGenre(genreId, 50)
  if (!artistBasedOnGenre?.artists?.items?.length) return <span className="text-white">No artists found</span>

  // Spotify API gives inconsistent search results based on genre, so we filter out irrelevant artists.
  const filteredArtistBasedOnGenre = artistBasedOnGenre.artists.items
    .filter((artist) => artist.genres.includes(decodeURIComponent(genreId)))
    .sort((artistA, artistB) => artistB.followers.total - artistA.followers.total)
    .slice(0, 12)

  return (
    <List>
      {filteredArtistBasedOnGenre.map((artist) => (
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
