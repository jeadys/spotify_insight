'use client'

import { XCircleIcon } from '@heroicons/react/solid'

import { useStore } from '@/hooks/useStore'
import { useSeedStore } from 'store/useSeed'

export default function GeneratorSeed() {
  const removeSeed = useSeedStore((state) => state.removeSeed)
  // Custom useStore hook needed for persist storage to work with NextJS Hydration
  const seedCount = useStore(useSeedStore, (state) => state.seedCount) || 0
  const artistSeed = useStore(useSeedStore, (state) => state.artist) || []
  const trackSeeds = useStore(useSeedStore, (state) => state.track) || []

  return (
    <>
      <h4 className="mb-5 text-xl text-white">{seedCount} / 5 seeds used</h4>

      <p className="font-bold">Artist Seeds</p>
      {artistSeed.length ? (
        <ul className="flex flex-wrap items-center gap-2 text-white">
          {artistSeed.map((artist) => (
            <li
              key={artist.id}
              onClick={() => removeSeed('artist', artist.id)}
              className="flex items-center gap-2 rounded-md bg-gray-1200 p-2"
            >
              <XCircleIcon className="h-6 w-6 hover:cursor-pointer hover:text-blue-300" />
              {artist.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}

      <p className="font-bold">Track Seeds</p>
      {trackSeeds.length ? (
        <ul className="flex flex-wrap items-center gap-2 text-white">
          {trackSeeds.map((track) => (
            <li
              key={track.id}
              onClick={() => removeSeed('track', track.id)}
              className="flex items-center gap-2 rounded-md bg-gray-1200 p-2"
            >
              <XCircleIcon className="h-6 w-6 hover:cursor-pointer hover:text-blue-300" />
              {track.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>None</p>
      )}
    </>
  )
}
