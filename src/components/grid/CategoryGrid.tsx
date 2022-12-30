'use client'

import Link from 'next/link'

import DiscoverButton from '@/components/button/DiscoverButton'
import CardGrid from '@/components/card/CardGrid'
import CardImage from '@/components/card/CardImage'
import CardItem from '@/components/card/CardItem'
import CardName from '@/components/card/CardName'

export default function CategoryGrid({ categories }: { categories: SpotifyApi.CategoryObject[] }) {
  if (!categories?.length) return <DiscoverButton titleMessage="No categories found" buttonMessage="Discover new tracks here" />

  return (
    <CardGrid>
      {categories.map((category) => (
        <CardItem key={category.id}>
          <Link href={`/discover/categories/${category.id}`} className="flex flex-col items-center">
            <CardImage imageUrl={(category.icons[0] || {}).url} imageAlt={category.name} imageType="category" rounded />
            <CardName name={category.name} />
          </Link>
        </CardItem>
      ))}
    </CardGrid>
  )
}
