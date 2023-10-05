import Image from 'next/image'
import Link from 'next/link'

import MetadataGrid from '@/components/analysis/MetadataGrid'
import MetadataItem from '@/components/analysis/MetadataItem'
import Header from '@/components/layout/Header'
import { getArtistById } from '@/server/api'

type Props = {
  artistId: string
}

export default async function ArtistHeader({ artistId }: Props) {
  const artist = await getArtistById(artistId)

  return (
    <Header>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Image
          src={artist.images?.[1]?.url || '/images/nocover.webp'}
          alt={artist.name}
          width="0"
          height="0"
          sizes="100vw"
          priority={true}
          className="h-52 w-52  rounded-full object-cover sm:h-60 sm:w-60"
        />

        <div className="capitalize text-white">
          <h2>{artist.type}</h2>
          <h1 className="line-clamp-1 break-all text-3xl font-black sm:text-4xl">{artist.name}</h1>
          <Link href={artist.external_urls.spotify} target="_blank" className="block max-w-max">
            <Image src="/icons/spotify.svg" alt="Spotify" width="0" height="0" sizes="100vw" className="mt-2 h-6 w-6" />
          </Link>
        </div>
      </div>

      <MetadataGrid>
        <MetadataItem title="Followers" value={artist.followers.total.toLocaleString()} />
        <MetadataItem title="Popularity" value={artist.popularity / 10} />
      </MetadataGrid>
    </Header>
  )
}
