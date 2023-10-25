'use client'

import Image from 'next/image'

import { useStore } from '@/hooks/useStore'
import { SeedType, initialGeneratorState, useGeneratorStore } from '@/store/useGenerator'

type Props = {
  seedType: SeedType
  id: string
  name: string
  description: string
  image: string
}

export const GeneratorSearchItem = ({ seedType, id, name, description, image }: Props) => {
  const addSeed = useGeneratorStore((state) => state.addSeed)
  const removeSeed = useGeneratorStore((state) => state.removeSeed)
  //   Custom useStore hook needed for persist storage to work with NextJS Hydration
  const state = useStore(useGeneratorStore, (state) => state) ?? initialGeneratorState
  const maxSeed = 5

  return (
    <li className="my-5 flex max-w-max items-center gap-5">
      <Image
        src={image || '/images/nocover.webp'}
        alt={name}
        width="0"
        height="0"
        sizes="100vw"
        className="h-10 w-10 flex-shrink-0 rounded-md object-cover"
      />

      <span
        onClick={() => (state[seedType].find((seed) => seed.id === id) ? removeSeed(seedType, id) : addSeed(seedType, id, name))}
        className={`${
          state.seedCount < maxSeed || (state.seedCount == maxSeed && state[seedType].find((seed) => seed.id === id))
            ? 'cursor-pointer'
            : 'pointer-events-none opacity-40'
        }`}
      >
        <span className="line-clamp-1 text-white">{name}</span>
        <span className="line-clamp-1 text-gray-400">{description || 'N/A'}</span>
      </span>

      {state[seedType].find((seed) => seed.id === id) && <span className="rounded-md bg-blue-600 p-1 text-sm text-white">Seeded</span>}
    </li>
  )
}
