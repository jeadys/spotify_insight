'use client'

import { MusicalNoteIcon, HeartIcon, CalendarIcon } from '@heroicons/react/24/solid'

type Props = {
  value: string | number
  icon?: 'heart' | 'music' | 'calendar'
  className?: string
}

export const Label = ({ value, icon, className = '' }: Props) => {
  const iconComponent = (() => {
    switch (icon) {
      case 'heart':
        return <HeartIcon className="mr-2 inline h-3 w-3" />
      case 'music':
        return <MusicalNoteIcon className="mr-2 inline h-3 w-3" />
      case 'calendar':
        return <CalendarIcon className="mr-2 inline h-3 w-3" />
      default:
        return null
    }
  })()

  return (
    <span className={`mr-2 mt-2 max-w-max rounded-md bg-gray-1200 px-2 py-1 text-xs text-white ${className}`}>
      {iconComponent}
      {value}
    </span>
  )
}
