'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { timeRangeDescriptions } from '@/components/filter/TimeRangeDescription'

const timeRangeFilterItems = Object.keys(timeRangeDescriptions).map((key) => ({
  title: timeRangeDescriptions[key],
  timeRange: key,
}))

export const TimeRangeFilter = () => {
  const searchParams = useSearchParams()
  const currentTimeRange = searchParams?.get('timeRange')

  return (
    <ul className="flex flex-row gap-5">
      {timeRangeFilterItems.map((timeRangeFilterItem) => (
        <li key={timeRangeFilterItem.timeRange}>
          <Link
            href={`?timeRange=${timeRangeFilterItem.timeRange}`}
            className={`rounded-md p-2 text-sm font-semibold uppercase text-gray-400 ${
              currentTimeRange == timeRangeFilterItem.timeRange
                ? ' text-blue-400 underline decoration-blue-400 decoration-4 underline-offset-8'
                : 'hover:text-gray-300'
            }`}
            scroll={false}
          >
            {timeRangeFilterItem.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
