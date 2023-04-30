'use client'

import { useState } from 'react'

import Image from 'next/image'

import SkeletonGenerator from '@/components/generator/SkeletonGenerator'
import SearchInput from '@/components/layout/SearchInput'
import useGeneratorSearch from '@/hooks/query/useGeneratorSearch'
import useDebounce from '@/hooks/useDebounce'
import useFocus from '@/hooks/useFocus'
import { useGeneratorStore } from 'store/useGenerator'

export default function GeneratorSearch() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)
  const { data, isInitialLoading } = useGeneratorSearch(debouncedSearch)
  const inputRef = useFocus()
  const addSeed = useGeneratorStore((state) => state.addSeed)

  return (
    <div>
      <SearchInput value={search} placeholder="Search artist and track seeds" inputRef={inputRef} setSearch={setSearch} />

      {isInitialLoading && <SkeletonGenerator contentAmount={3} />}

      <div className="flex flex-col">
        {data?.artists?.items && (
          <>
            <p className="mt-5 font-medium text-white">Artists</p>
            <ul>
              {data?.artists?.items.map((artist) => (
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

                  <span>
                    <span className="text-white line-clamp-1">{artist.name}</span>
                    <span className="text-gray-400 line-clamp-1">{artist.genres[0] || 'N/A'}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {data?.tracks?.items && (
          <>
            <p className="font-medium text-white">Tracks</p>
            <ul>
              {data?.tracks?.items.map((track) => (
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

                  <span>
                    <span className="text-white line-clamp-1">{track.name}</span>
                    <span className="text-gray-400 line-clamp-1">{track.artists[0].name}</span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
