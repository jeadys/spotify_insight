'use client'

import Link from 'next/link'

import { timeRangeDescriptions } from '@/components/filter/TimeRangeDescription'

const timeRangeFilterItems = Object.keys(timeRangeDescriptions).map((key) => ({
  title: timeRangeDescriptions[key],
  timeRange: key,
}))

export const TimeRangeFilter = () => {
  return (
    <div className="flex flex-row gap-5">
      {timeRangeFilterItems.map((timeRangeFilterItem) => (
        <Link
          key={timeRangeFilterItem.timeRange}
          href={`?timeRange=${timeRangeFilterItem.timeRange}`}
          className={`rounded-md p-2 text-sm font-semibold uppercase text-gray-400 decoration-4 underline-offset-8`}
          scroll={false}
        >
          {timeRangeFilterItem.title}
        </Link>
      ))}
    </div>
  )
}
