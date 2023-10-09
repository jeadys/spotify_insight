import clsx from 'clsx'

type Props = {
  imageShape: 'round' | 'square'
  hideStatistics?: boolean
}

export default function SkeletonHeader({ imageShape, hideStatistics }: Props) {
  return (
    <header className="flex animate-pulse flex-col gap-3 pt-5 sm:pt-10">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div
          className={clsx(`h-52 w-52 bg-gray-1200 sm:h-60 sm:w-60`, {
            'rounded-full': imageShape === 'round',
            'rounded-md': imageShape === 'square',
          })}
        ></div>

        <div className="flex flex-col gap-2">
          <h2 className="h-4 w-16 rounded-full bg-gray-1200"></h2>
          <h1 className="h-10 w-32 rounded-full bg-gray-1200"></h1>
        </div>
      </div>

      {!hideStatistics && (
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 5xl:grid-cols-6">
          <li className="flex flex-col gap-3">
            <h3 className="h-6 w-32 rounded-full bg-gray-1200 text-xl font-bold"></h3>
            <h4 className="h-4 w-24 rounded-full bg-gray-1200"></h4>
          </li>
          <li className="flex flex-col gap-3">
            <h3 className="h-6 w-32 rounded-full bg-gray-1200 text-xl font-bold"></h3>
            <h4 className="h-4 w-24 rounded-full bg-gray-1200"></h4>
          </li>
          <li className="flex flex-col gap-3">
            <h3 className="h-6 w-32 rounded-full bg-gray-1200 text-xl font-bold"></h3>
            <h4 className="h-4 w-24 rounded-full bg-gray-1200"></h4>
          </li>
        </ul>
      )}
    </header>
  )
}
