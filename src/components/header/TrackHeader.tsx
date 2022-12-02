import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import type { ITrackHeader } from '../../lib/interfaces/track-header'
import { getDoesUserHaveAlbumSaved } from '../../lib/spotify'
import { getYear } from '../../lib/utils'
import BioTitle from '../bio/BioTitle'
import BioValue from '../bio/BioValue'
import { SaveAlbumButton } from '../button'

export default function TrackHeader({ data }: ITrackHeader) {
  const queryClient = useQueryClient()
  const { asPath } = useRouter()

  const fetchDoesUserHaveAlbumSaved = async () => {
    const isAlbumSaved = await getDoesUserHaveAlbumSaved(data.id)
    return isAlbumSaved.data
  }

  const { data: isAlbumSaved } = useQuery(['is-album-saved', data.id], fetchDoesUserHaveAlbumSaved, {
    staleTime: Infinity,
    enabled: !!queryClient.getQueryData(['album', data.id]),
    refetchOnWindowFocus: false,
  })

  return (
    <div className="mt-5">
      <Image
        src={data.images.length && data.images[0] ? data.images[0].url : '/images/nocover.webp'}
        alt={data.name}
        width="0"
        height="0"
        sizes="100vw"
        className="mx-auto h-80 w-80 rounded-md object-cover"
      />

      <div className="mx mt-5 flex flex-col items-center gap-y-2">
        <div className="text-2xl font-black text-white md:text-4xl">{data.name}</div>

        {data.owner && <span className="text-sm text-slate-400">By {data.owner.display_name}</span>}

        {data.release_date && <span className="text-sm text-slate-400">Released in {getYear(data.release_date)}</span>}

        {data.tracks && <div className="text-sm font-semibold text-white">{data.tracks.total < 50 ? data.tracks.total : '50'} Tracks</div>}

        <div className="h-5">{isAlbumSaved && <SaveAlbumButton id={data.id} saved={isAlbumSaved[0]} />}</div>

        {asPath == `/playlists/${data.id}` && data.tracks.total >= 5 && (
          <Link
            href={`/recommendations/${data.id}`}
            className="my-5 max-w-fit cursor-pointer rounded-full bg-cyan-600 py-2 px-5 font-semibold text-white"
          >
            Get recommendations
          </Link>
        )}

        {data.popularity && (
          <div className="my-5">
            <BioValue value={` ${data.popularity.toString()} %`} />
            <BioTitle title="Popularity" />
          </div>
        )}
      </div>
    </div>
  )
}
