'use client'

import Image from 'next/image'
import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardItem from '@/components/card/CardItem'

export default function CategoryGrid({ categories }: { categories: SpotifyApi.CategoryObject[] }) {
  if (!categories?.length) return <DiscoverButton titleMessage="No categories found" buttonMessage="Discover new tracks here" />

  return (
    <CardGrid>
      {categories.map((category) => (
        <CardItem key={category.id}>
          <Link href={`/discover/categories/${category.id}`} className="flex flex-col items-center">
            <Image
              src={category.icons.length && category.icons[0] ? category.icons[0].url : '/images/nocover.webp'}
              alt={category.name}
              width="0"
              height="0"
              sizes="100vw"
              className="mx-auto h-32 w-32 rounded-full object-cover"
            />
          </Link>
        </CardItem>
      ))}
    </CardGrid>
  )
}
