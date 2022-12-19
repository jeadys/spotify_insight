'use client'

export default function PlaylistHeaderSkeleton() {
  return (
    <div className="mt-5 animate-pulse">
      <div className="mx-auto h-80 w-80 bg-gray-800"></div>

      <div className="mx mt-5 flex flex-col items-center gap-y-4 rounded-md">
        <div className="h-12 w-44 rounded-md bg-gray-800"></div>
        <div className="h-4 w-44 rounded-md bg-gray-800"></div>
        <div className="h-4 w-44 rounded-md bg-gray-800"></div>
        <div className="my-5 h-10 w-52 rounded-md bg-gray-800"></div>
      </div>
    </div>
  )
}
