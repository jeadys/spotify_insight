'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Oops something went wrong</h1>
        <p className="mt-6 text-base leading-7 text-gray-300">Try refreshing the page or click the button below</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => reset()}
            className="rounded-md bg-blue-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
          >
            Retry
          </button>
        </div>
      </div>
    </main>
  )
}
