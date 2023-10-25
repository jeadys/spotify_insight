'use client'

import { TimeRangeDescription } from '../filter/TimeRangeDescription'

type Props = {
  title: string
  description?: string
  timeRange?: string
  children: React.ReactNode
}

export const Section = ({ title, description, timeRange, children }: Props) => {
  return (
    <section>
      <header className="sticky top-0 z-10 bg-gray-1300 py-2 capitalize text-white sm:py-5">
        <h2 className="text-2xl font-black sm:text-3xl">{title}</h2>
        <h3 className="line-clamp-1 break-all text-gray-300">
          {description} {timeRange && <TimeRangeDescription timeRange={timeRange} />}
        </h3>
      </header>
      {children}
    </section>
  )
}
