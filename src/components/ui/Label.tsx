import { MusicNoteIcon, HeartIcon, CalendarIcon } from '@heroicons/react/solid'

type Props = {
  value: string | number
  icon?: 'heart' | 'music' | 'calendar'
  className?: string
}

export default function Label({ value, icon, className = '' }: Props) {
  const iconComponent = (() => {
    switch (icon) {
      case 'heart':
        return <HeartIcon className="mr-2 inline h-3 w-3" />
      case 'music':
        return <MusicNoteIcon className="mr-2 inline h-3 w-3" />
      case 'calendar':
        return <CalendarIcon className="mr-2 inline h-3 w-3" />
      default:
        return null
    }
  })()

  return (
    <span className={`mt-2 mr-2 max-w-max rounded-md bg-gray-1200 px-2 py-1 text-xs text-white ${className}`}>
      {iconComponent}
      {value}
    </span>
  )
}
