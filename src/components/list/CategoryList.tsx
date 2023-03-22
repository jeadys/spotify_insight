'use client'

import Image from 'next/image'
import Link from 'next/link'

import { getCategories } from '@/server/api'

export default async function CategoryList() {
  const { categories } = await getCategories(50)

  return (
    <ul className="grid grid-cols-3 gap-5 lg:grid-cols-4 5xl:grid-cols-6">
      {categories.items.map((category) => (
        <Link href={`/discover/categories/${category.id}`} className="relative flex flex-row gap-5 text-white" key={category.id}>
          <Image
            src={category.icons.length && category.icons[0] ? category.icons[0].url : '/images/nocover.webp'}
            alt={category.name}
            width="0"
            height="0"
            sizes="100vw"
            className="h-28 w-28 rounded-full bg-black object-cover opacity-90 bg-blend-hard-light"
          />
          <span className="absolute">{category.name}</span>
        </Link>
      ))}
    </ul>
  )
}
