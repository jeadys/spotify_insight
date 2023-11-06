'use client'

import clsx from 'clsx'

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

import { useStore } from '@/hooks/useStore'
import { initialGeneratorState, useGeneratorStore } from '@/store/useGenerator'

export const GeneratorSwitch = () => {
  const setIsPublic = useGeneratorStore((state) => state.setIsPublic)
  const isPublic = useStore(useGeneratorStore, (state) => state.isPublic) ?? initialGeneratorState.isPublic

  return (
    <div className="flex items-center gap-5 text-white">
      <div className="flex h-10 w-20 rounded-full bg-gray-800 hover:cursor-pointer" onClick={() => setIsPublic(!isPublic)}>
        <span
          className={clsx(
            `flex h-10 w-10 items-center justify-center rounded-full border-2 border-blue-500 bg-gray-1200 transition-all duration-500`,
            {
              'ml-10': isPublic,
            }
          )}
        >
          {isPublic && <CheckIcon className="h-6 w-6 text-white" />}
          {!isPublic && <XMarkIcon className="h-6 w-6 text-white" />}
        </span>
      </div>
      <label className="font-semibold">Public</label>
    </div>
  )
}
