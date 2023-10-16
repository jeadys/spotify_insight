'use client'

type Props = {
  contentAmount: number
}

export const SkeletonAudioFeature = ({ contentAmount }: Props) => {
  const skeletons = new Array(contentAmount).fill(null).map((_, index) => (
    <li key={index} className="capitalize">
      <h4 className="mb-2 h-6 w-32 rounded-md bg-gray-1100"></h4>
      <div className="h-2 rounded-full bg-gray-1100">
        <div className="h-2 rounded-full bg-gray-1100"></div>
      </div>
    </li>
  ))
  return <ul className="grid w-full animate-pulse grid-cols-2 items-start justify-start gap-5 gap-y-5 lg:grid-cols-3">{skeletons}</ul>
}
