'use client'

import { GeneratorSeedItem } from '@/components/generator/GeneratorSeedItem'
import { useStore } from '@/hooks/useStore'
import { initialGeneratorState, useGeneratorStore } from '@/store/useGenerator'

export const GeneratorSeed = () => {
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
            <GeneratorSeedItem key={artist.id} seedType="artist" id={artist.id} name={artist.name} />
          ))}
        </ul>
      ) : (
        <p className="my-2 text-white">No seeds</p>
      )}

      <p className="font-medium text-white">Tracks</p>
      {state.track.length ? (
        <ul className="flex flex-wrap items-center gap-2 text-white">
          {state.track.map((track) => (
            <GeneratorSeedItem key={track.id} seedType="track" id={track.id} name={track.name} />
          ))}
        </ul>
      ) : (
        <p className="my-2 text-white">No seeds</p>
      )}
    </div>
  )
}
