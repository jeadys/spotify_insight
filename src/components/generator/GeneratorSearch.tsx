'use client'

import { useState } from 'react'

import Image from 'next/image'

import { SkeletonGenerator } from '@/components/generator/SkeletonGenerator'
import { SearchInput } from '@/components/layout/SearchInput'
import { useGeneratorSearch } from '@/hooks/query/useGeneratorSearch'
import { useDebounce } from '@/hooks/useDebounce'
import { useStore } from '@/hooks/useStore'
import { initialGeneratorState, useGeneratorStore } from '@/store/useGenerator'

export const GeneratorSearch = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)
  const { data, isInitialLoading } = useGeneratorSearch(debouncedSearch)
  const addSeed = useGeneratorStore((state) => state.addSeed)
  const removeSeed = useGeneratorStore((state) => state.removeSeed)
  // Custom useStore hook needed for persist storage to work with NextJS Hydration
  const state = useStore(useGeneratorStore, (state) => state) ?? initialGeneratorState
  const maxSeed = 5

  return (
    <div>
      <SearchInput value={search} placeholder="Search artist and track seeds" setSearch={setSearch} />

      {isInitialLoading && <SkeletonGenerator contentAmount={3} />}

      <div className="flex flex-col">
        {data?.artists?.items && (
          <>
            <p className="mt-5 font-medium text-white">Artists</p>
            <ul>
              {data?.artists?.items.map((artist) => (
                <li key={artist.id} className="my-5 flex max-w-max items-center gap-5">
                  <Image
                    src={artist.images?.[2]?.url || '/images/nocover.webp'}
                    alt={artist.name}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                  />

                  <span
                    onClick={() =>
                      state.artist.find((artistSeed) => artistSeed.id === artist.id)
                        ? removeSeed('artist', artist.id)
                        : addSeed('artist', artist.id, artist.name)
                    }
                    className={`${
                      state.seedCount < maxSeed ||
                      (state.seedCount == maxSeed && state.artist.find((artistSeed) => artistSeed.id === artist.id))
                        ? 'cursor-pointer'
                        : 'pointer-events-none opacity-40'
                    }`}
                  >
                    <span className="line-clamp-1 text-white">{artist.name}</span>
                    <span className="line-clamp-1 text-gray-400">{artist.genres[0] || 'N/A'}</span>
                  </span>

                  {state.artist.find((artistSeed) => artistSeed.id === artist.id) && (
                    <span className="rounded-md bg-blue-600 p-1 text-sm text-white">Seeded</span>
                  )}
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
                <li key={track.id} className="my-5 flex max-w-max items-center gap-5">
                  <Image
                    src={track.album.images?.[2]?.url || '/images/nocover.webp'}
                    alt={track.name}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="h-10 w-10 flex-shrink-0 rounded-md object-cover"
                  />

                  <span
                    onClick={() =>
                      state.track.find((trackSeed) => trackSeed.id === track.id)
                        ? removeSeed('track', track.id)
                        : addSeed('track', track.id, track.name)
                    }
                    className={`${
                      state.seedCount < maxSeed ||
                      (state.seedCount == maxSeed && state.track.find((trackSeed) => trackSeed.id === track.id))
                        ? 'cursor-pointer'
                        : 'pointer-events-none opacity-40'
                    }`}
                  >
                    <span className="line-clamp-1 text-white">{track.name}</span>
                    <span className="line-clamp-1 text-gray-400">{track.artists[0].name}</span>
                  </span>

                  {state.track.find((trackSeed) => trackSeed.id === track.id) && (
                    <span className="rounded-md bg-blue-600 p-1 text-sm text-white">Seeded</span>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}
