'use client'

import { useGeneratorStore } from '@/store/useGenerator'

export const GeneratorReset = () => {
  const reset = useGeneratorStore((state) => state.reset)

  return (
    <button onClick={reset} className="text-white hover:underline">
      Restore Defaults
    </button>
  )
}
