'use client'

import type { ReactElement } from 'react'

type Props = {
  amount: number
}

export default function TrackGridSkeleton({ amount }: Props) {
  const tracks: ReactElement[] = []

  for (let index = 0; index < amount; index++) {
    tracks.push(
      <span key={index} className="flex w-full animate-pulse flex-row gap-5 rounded-md p-4">
        <span className="h-9 w-9 rounded-md bg-gray-800"></span>
        <span className="h-9 flex-1 rounded-md bg-gray-800"></span>
        <span className="h-9 flex-1 rounded-md bg-gray-800 album:hidden"></span>
        <span className="h-9 flex-1 rounded-md bg-gray-800 album:hidden"></span>
      </span>
    )
  }

  return (
    <div className="w-full">
      <div className="my-6 h-8 w-44 animate-pulse rounded-md bg-gray-800"></div>
      <div className="">{tracks}</div>
    </div>
  )
}
