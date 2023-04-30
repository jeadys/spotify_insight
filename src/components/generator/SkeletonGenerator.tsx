type Props = {
  contentAmount: number
}

export default function SkeletonGenerator({ contentAmount }: Props) {
  const skeletons = new Array(contentAmount).fill(null).map((_, index) => (
    <li key={index} className="my-5 flex items-center gap-5">
      <span className="h-10 w-10 rounded-md bg-gray-1100"></span>

      <span className="flex flex-grow flex-col gap-3">
        <span className="h-4 w-16 rounded-md bg-gray-1100"></span>
        <span className="h-4 w-32 rounded-md bg-gray-1100"></span>
      </span>
    </li>
  ))

  return (
    <>
      <p className="mt-5 font-medium text-white">Artists</p>
      <ul className="animate-pulse">{skeletons}</ul>
      <p className="font-medium text-white">Tracks</p>
      <ul className="animate-pulse">{skeletons}</ul>
    </>
  )
}
