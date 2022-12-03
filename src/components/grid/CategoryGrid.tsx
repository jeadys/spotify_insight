'use client'

import Image from 'next/image'
import Link from 'next/link'

import type { Categories } from '../../lib/interfaces/categories'
import DiscoverButton from '../button/DiscoverButton'

export default function CategoryGrid({ items }: Categories) {
  return (
    <>
      {items && items.length ? (
        <>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 5xl:grid-cols-6 6xl:grid-cols-6">
            {items.map((category) => (
              <li
                key={category.id}
                className="overflow-hidden rounded-lg transition ease-in-out sm:bg-slate-800 sm:shadow sm:hover:bg-slate-700"
              >
                <Link href={`/discover/categories/${category.id}`} className="flex flex-col gap-5">
                  <h3 className="m-10 mt-6 text-lg font-extrabold text-white">{category.name}</h3>
                  <Image
                    src={category.icons.length && category.icons[0] ? category.icons[0].url : '/images/nocover.webp'}
                    alt={category.name}
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="-mr-4 h-28 w-28 rotate-12 place-self-end"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <DiscoverButton titleMessage="No categories found" buttonMessage="Discover new tracks" />
      )}
    </>
  )
}
