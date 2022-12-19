'use client'

import Link from 'next/link'

type Props = {
  titleMessage: string
  buttonMessage: string
}

export default function DiscoverButton({ titleMessage, buttonMessage }: Props) {
  return (
    <span className="flex flex-col items-center gap-5 text-white">
      <span>{titleMessage}</span>
      <Link href={`/discover`} className="text-xs text-gray-300 hover:underline">
        {buttonMessage}
      </Link>
    </span>
  )
}
