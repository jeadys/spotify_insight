'use client'

import Link from 'next/link'

type Props = {
  titleMessage: string
  buttonMessage: string
}

export default function DiscoverButton({ titleMessage, buttonMessage }: Props) {
  return (
    <div className="flex flex-col items-center gap-5 text-white">
      <h3>{titleMessage}</h3>
      <Link href={`/search`} className="text-sm text-gray-300 underline">
        {buttonMessage}
      </Link>
    </div>
  )
}
