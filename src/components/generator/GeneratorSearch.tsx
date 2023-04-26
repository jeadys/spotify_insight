'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

import useDebounce from '@/hooks/useDebounce'
import useFocus from '@/hooks/useFocus'
import { getSearchSeeds } from '@/server/api'
import { useSeedStore } from 'store/useSeed'

import SearchInput from '../layout/SearchInput'

type Props = {
  children: React.ReactNode
}

export default function GeneratorSearch({ children }: Props) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)
  const inputRef = useFocus()

  const { data: searchData } = useQuery({
    queryKey: ['debouncedSearch', debouncedSearch],
    queryFn: () => getSearchSeeds(debouncedSearch, 3),
    enabled: !!debouncedSearch,
  })

  const addSeed = useSeedStore((state) => state.addSeed)

  return (
    <>
      <div className="grid gap-5 text-white sm:grid-cols-2">
        <div className="flex flex-col gap-5">
          <SearchInput
            value={search}
            placeholder="Search artist and track seeds"
            inputRef={inputRef}
            onChange={(e) => setSearch(e.target.value)}
          />

          {children}
        </div>

        <div className="flex flex-col">
          {searchData?.artists?.items && (
            <>
              <p className="font-bold">Artists</p>
              <ul>
                {searchData?.artists?.items.map((artist) => (
                  <li
                    key={artist.id}
                    onClick={() => addSeed('artist', artist.id, artist.name)}
                    className="my-5 flex max-w-max cursor-pointer items-center gap-5 hover:underline"
                  >
                    <Image
                      src={artist.images?.[2]?.url || '/images/nocover.webp'}
                      alt={artist.name}
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                    />

                    <div className="max-w-max text-white line-clamp-1">{artist.name}</div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {searchData?.tracks?.items && (
            <>
              <p className="font-bold">Tracks</p>
              <ul>
                {searchData?.tracks?.items.map((track) => (
                  <li
                    key={track.id}
                    onClick={() => addSeed('track', track.id, `${track.name} - ${track.artists[0].name}`)}
                    className="my-5 flex max-w-max cursor-pointer items-center gap-5 hover:underline"
                  >
                    <Image
                      src={track.album.images?.[2]?.url || '/images/nocover.webp'}
                      alt={track.name}
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="h-10 w-10 flex-shrink-0 rounded-md object-cover"
                    />

                    <div className="max-w-max text-white line-clamp-1">
                      {track.name} - {track.artists[0].name}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  )
}
