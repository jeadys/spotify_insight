import type { Dispatch, SetStateAction } from 'react'

import Link from 'next/link'

type Props = {
  title: string
  breadcrumb?: string
  seeAll?: string
  children: React.ReactNode
  timeRange?: string
  setTimeRange?: Dispatch<SetStateAction<string>>
}

export default function SectionWrapper({ title, breadcrumb, seeAll, children, timeRange, setTimeRange }: Props) {
  const timeRangeBtns = [
    {
      title: 'This month',
      range: 'short',
    },
    {
      title: ' Last 6 months',
      range: 'medium',
    },
    {
      title: 'All time',
      range: 'long',
    },
  ]

  return (
    <>
      <div className="mb-5 flex">
        <h2 className="text-xl font-semibold text-white">
          {title && (
            <>
              {seeAll ? (
                <Link href={seeAll}>
                  <a className="hover:underline">{title}</a>
                </Link>
              ) : (
                <span>{title}</span>
              )}
            </>
          )}
        </h2>

        {seeAll && (
          <Link href={seeAll}>
            <a className="ml-auto cursor-pointer text-sm font-light uppercase text-gray-300 transition ease-in-out hover:text-white">
              See All
            </a>
          </Link>
        )}

        {timeRange && setTimeRange && (
          <ul className="ml-auto flex flex-row justify-center gap-5 text-white">
            {timeRangeBtns.map((timeRangeBtn) => (
              <li key={timeRangeBtn.range}>
                <button
                  className={`text-sm uppercase decoration-4 underline-offset-8  ${
                    timeRange === timeRangeBtn.range
                      ? 'cursor-default underline decoration-sky-700'
                      : 'hover:underline hover:decoration-sky-900'
                  }`}
                  onClick={() => setTimeRange(timeRangeBtn.range)}
                >
                  {timeRangeBtn.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {children}
    </>
  )
}
