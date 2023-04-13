import clsx from 'clsx'

type Props = {
  imageShape: 'round' | 'square'
  imageSize: 'small' | 'medium' | 'large'
  gridFlow: 'leftRight' | 'topBottom'
  gridSize: 'compact' | 'broad'
  contentAmount: number
}

export default function Skeleton({ imageShape, imageSize, gridFlow, gridSize, contentAmount }: Props) {
  const skeletons = new Array(contentAmount).fill(null).map((_, index) => (
    <div
      key={index}
      className={clsx('flex gap-5', {
        'flex-row': gridFlow === 'leftRight',
        'flex-col': gridFlow === 'topBottom',
      })}
    >
      <div
        className={clsx('bg-gray-1100', {
          'rounded-full': imageShape === 'round',
          'rounded-md': imageShape === 'square',
          'h-14 w-14': imageSize === 'small',
          'h-32 w-32': imageSize === 'medium',
          'h-60 w-60': imageSize === 'large',
        })}
      ></div>

      <div className="flex flex-col gap-3">
        <div className="h-4 w-32 rounded-md bg-gray-1100"></div>
        <div className="h-4 w-32 rounded-md bg-gray-1100"></div>
      </div>
    </div>
  ))

  return (
    <div
      className={clsx('grid animate-pulse', {
        'grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 5xl:grid-cols-3': gridSize === 'compact',
        'grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 5xl:grid-cols-6': gridSize === 'broad',
      })}
    >
      {skeletons}
    </div>
  )
}
