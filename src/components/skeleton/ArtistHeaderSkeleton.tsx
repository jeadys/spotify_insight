import React from 'react'

export default function ArtistHeaderSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col items-center">
        <div className="h-96 w-96 bg-gray-800"></div>
        <div className="mt-12 h-24 w-96 bg-gray-800"></div>
        <div className="mt-8 h-5 w-5 bg-gray-800"></div>
      </div>
      <div className="mt-8 flex w-full flex-col items-center justify-center gap-y-5 md:flex-row md:gap-x-20">
        <div className="h-5 w-24 bg-gray-800"></div>
        <div className="h-5 w-24 bg-gray-800"></div>
        <div className="h-5 w-24 bg-gray-800"></div>
      </div>
    </div>
  )
}
