'use client'

type Props = {
  contentAmount: number
}

export const SkeletonGenreList = ({ contentAmount }: Props) => {
  const skeletons = new Array(contentAmount).fill(null).map((_, index) => <li key={index} className="h-10 rounded-full bg-gray-1200"></li>)

  return <ul className="grid animate-pulse grid-cols-4 gap-5 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 5xl:grid-cols-6">{skeletons}</ul>
}
