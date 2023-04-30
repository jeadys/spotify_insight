type Props = {
  contentAmount: number
}

export default function TrackSkeleton({ contentAmount }: Props) {
  const skeletons = new Array(contentAmount).fill(null).map((_, index) => (
    <li key={index} className="flex items-center gap-5 p-2">
      <span className="h-10 w-10 rounded-md bg-gray-1100"></span>

      <span className="flex flex-grow flex-col gap-4">
        <span className="h-4 w-16 rounded-md bg-gray-1100"></span>
        <span className="h-4 w-32 rounded-md bg-gray-1100"></span>
      </span>

      <span className="h-4 w-16 rounded-md bg-gray-1100"></span>
    </li>
  ))

  return <ul className="w-full animate-pulse">{skeletons}</ul>
}
