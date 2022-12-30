'use client'

import clsx from 'clsx'
import Image from 'next/image'

type Props = {
  imageUrl: string
  imageAlt: string
  imageType: 'artist' | 'track' | 'album' | 'playlist' | 'category'
  rounded?: boolean
}

export default function CardImage({ imageUrl, imageAlt, imageType, rounded }: Props) {
  return (
    <Image
      src={imageUrl || `/images/nocover.webp`}
      alt={imageAlt}
      width="0"
      height="0"
      sizes="100vw"
      className={clsx('mx-auto mb-5 object-cover', {
        'h-48 w-48': imageType === 'album' || imageType === 'playlist',
        'h-32 w-32': imageType === 'artist' || imageType === 'category',
        'h-10 w-10 ': imageType === 'track',
        'rounded-full': rounded,
        'rounded-md': !rounded,
      })}
    />
  )
}
