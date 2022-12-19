'use client'

import type { Dispatch, SetStateAction } from 'react'

import Link from 'next/link'

type Props = {
  title: string
  seeAll?: string
  children: React.ReactNode
  timeRange?: string
  setTimeRange?: Dispatch<SetStateAction<string>>
}

export default function SectionWrapper({ title, seeAll, children, timeRange, setTimeRange }: Props) {
  type TimeRangeProps = {
    title: string
    range: string
  }[]

  const timeRangeBtns: TimeRangeProps = [
    {
      title: 'This month',
      range: 'short_term',
    },
    {
      title: ' Last 6 months',
      range: 'medium_term',
    },
    {
      title: 'All time',
      range: 'long_term',
    },
  ]

  return (
    <>
      <div className="my-5 flex">
        <h2 className="text-xl font-semibold text-white">
          {title && (
            <>
              {seeAll ? (
                <Link href={seeAll} className="hover:underline">
                  {title}
                </Link>
              ) : (
                <span>{title}</span>
              )}
            </>
          )}
        </h2>

        {seeAll && (
          <Link href={seeAll} className="ml-auto text-sm font-light uppercase text-gray-300 transition ease-in-out hover:text-white">
            See All
          </Link>
        )}

        {timeRange && setTimeRange && (
          <ul className="ml-auto flex flex-row justify-center gap-5 text-white">
            {timeRangeBtns.map((timeRangeBtn) => (
              <li
                key={timeRangeBtn.range}
                className={`text-sm uppercase decoration-4 underline-offset-8  ${
                  timeRange === timeRangeBtn.range
                    ? 'cursor-default underline decoration-sky-700'
                    : 'hover:underline hover:decoration-sky-900'
                }`}
                onClick={() => setTimeRange(timeRangeBtn.range)}
              >
                {timeRangeBtn.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      {children}
    </>
  )
}
