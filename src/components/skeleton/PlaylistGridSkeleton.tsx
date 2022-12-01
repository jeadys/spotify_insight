import type { ReactElement } from 'react'

type Props = {
  amount: number
}

export default function PlaylistGridSkeleton({ amount }: Props) {
  const playlists: ReactElement[] = []

  for (let index = 0; index < amount; index++) {
    playlists.push(
      <div key={index} className="rounded-lg shadow sm:bg-slate-800">
        <div className="flex flex-col items-center gap-6 py-4">
          <div className="h-48 w-48 rounded-md bg-gray-700"></div>
          <div className="h-3 w-32 rounded-md bg-gray-700"></div>
          <div className="h-3 w-32 rounded-md bg-gray-700"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-pulse">
      <div className="mb-10 h-8 w-44 rounded-md bg-gray-800"></div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
        {playlists}
      </div>
    </div>
  )
}
