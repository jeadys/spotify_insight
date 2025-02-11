'use client'

export const SkeletonScatter = () => {
  return (
    <>
      <div className="mx-auto my-5 flex max-w-md animate-pulse items-center justify-center gap-5">
        <div className="h-10 w-40 rounded-lg bg-gray-1100"></div>
        <div className="h-10 w-10 rounded-md bg-gray-1100"></div>
        <div className="h-10 w-40 rounded-lg bg-gray-1100"></div>
      </div>
      <div className="flex h-88 w-full flex-row items-center">
        <div className="h-40 w-4 rounded-lg bg-gray-1100"></div>
        <div className="mx-auto h-88 w-[90%] animate-pulse rounded-md bg-gray-1100"></div>
      </div>
      <div className="mx-auto mt-8 h-4 w-40 rounded-lg bg-gray-1100"></div>
    </>
  )
}
