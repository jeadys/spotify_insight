'use client'

import { XIcon } from '@heroicons/react/solid'

import { useStore } from '@/hooks/useStore'
import { initialGeneratorState, useGeneratorStore } from '@/store/useGenerator'

export default function GeneratorSeed() {
  const removeSeed = useGeneratorStore((state) => state.removeSeed)
  // Custom useStore hook needed for persist storage to work with NextJS Hydration
  const state = useStore(useGeneratorStore, (state) => state) ?? initialGeneratorState

  return (
    <div className="flex flex-col gap-5">
      <h4 className="text-lg text-white">
        {state.seedCount} of 5 seeds <span className="block text-sm text-blue-300">At least one required</span>
      </h4>

      <p className="mt-5 font-medium text-white">Artists</p>
      {state.artist.length ? (
        <ul className="flex flex-wrap items-center gap-2 text-white">
          {state.artist.map((artist) => (
            <li key={artist.id} className="flex items-center gap-2 rounded-md bg-gray-1200 p-2">
              <XIcon onClick={() => removeSeed('artist', artist.id)} className="h-6 w-6 hover:cursor-pointer" />
              {artist.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="my-2 text-white">No seeds</p>
      )}

      <p className="font-medium text-white">Tracks</p>
      {state.track.length ? (
        <ul className="flex flex-wrap items-center gap-2 text-white">
          {state.track.map((track) => (
            <li key={track.id} className="flex items-center gap-2 rounded-md bg-gray-1200 p-2">
              <XIcon onClick={() => removeSeed('track', track.id)} className="h-6 w-6 hover:cursor-pointer" />
              {track.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="my-2 text-white">No seeds</p>
      )}
    </div>
  )
}
