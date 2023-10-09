'use client'

import { XIcon } from '@heroicons/react/solid'

import { SeedType, useGeneratorStore } from '@/store/useGenerator'

type Props = {
  seedType: SeedType
  seeds: {
    id: string
    name: string
  }[]
}

export default function SeedList({ seedType, seeds }: Props) {
  const removeSeed = useGeneratorStore((state) => state.removeSeed)

  return seeds.length ? (
    <ul className="flex flex-wrap items-center gap-2 text-white">
      {seeds.map((seed) => (
        <li key={seed.id} className="flex items-center gap-2 rounded-md bg-gray-1200 p-2">
          <XIcon onClick={() => removeSeed(seedType, seed.id)} className="h-6 w-6 shrink-0 hover:cursor-pointer" />
          <span className="line-clamp-1 break-all">{seed.name}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="my-2 text-white">No seeds</p>
  )
}
