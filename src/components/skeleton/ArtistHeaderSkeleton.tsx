'use client'

export default function ArtistHeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center">
        <div className="h-96 w-96 bg-gray-800"></div>
        <div className="my-6 h-5 w-14 bg-gray-800"></div>
        <div className="h-24 w-96 bg-gray-800"></div>
      </div>
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-y-5 md:flex-row md:gap-x-20">
        <div className="h-5 w-28 bg-gray-800"></div>
        <div className="h-5 w-28 bg-gray-800"></div>
        <div className="h-5 w-28 bg-gray-800"></div>
      </div>
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-y-5 md:flex-row md:gap-x-20">
        <div className="h-5 w-24 bg-gray-800"></div>
        <div className="h-5 w-24 bg-gray-800"></div>
        <div className="h-5 w-24 bg-gray-800"></div>
      </div>
    </div>
  )
}
