'use client'

import { XMarkIcon } from '@heroicons/react/24/solid'

import { SeedType, useGeneratorStore } from '@/store/useGenerator'

type Props = {
  seedType: SeedType
  id: string
  name: string
}

export const GeneratorSeedItem = ({ seedType, id, name }: Props) => {
  const removeSeed = useGeneratorStore((state) => state.removeSeed)

  return (
    <li key={id} className="flex items-center gap-2 rounded-md bg-gray-1200 p-2">
      <XMarkIcon onClick={() => removeSeed(seedType, id)} className="h-6 w-6 shrink-0 hover:cursor-pointer" />
      <span className="line-clamp-1 break-all">{name}</span>
    </li>
  )
}
