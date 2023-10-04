'use client'

import { useGeneratorStore } from '@/store/useGenerator'

export default function GeneratorReset() {
  const reset = useGeneratorStore((state) => state.reset)

  return (
    <button onClick={reset} className="text-white hover:underline">
      Restore Defaults
    </button>
  )
}
