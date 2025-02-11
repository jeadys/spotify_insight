'use client'

type Props = {
  contentAmount: number
}

export const SkeletonAudioFeature = ({ contentAmount }: Props) => {
  const skeletons = new Array(contentAmount).fill(null).map((_, index) => (
    <li key={index} className="mb-2 flex w-full items-center justify-center gap-5 capitalize text-white">
      <h4 className="h-4 w-14 rounded-md bg-gray-1100"></h4>

      <div className="h-2 w-32 max-w-sm rounded-full bg-gray-1100"></div>

      <h4 className="h-4 w-14 rounded-md bg-gray-1100"></h4>
    </li>
  ))
  return <div className="grid animate-pulse grid-cols-1 gap-2 text-sm md:grid-cols-3">{skeletons}</div>
}
