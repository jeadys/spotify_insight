'use client'

import type { ReactElement } from 'react'

import clsx from 'clsx'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  type NavigationProps = {
    title: string
    link: string
    icon?: ReactElement
  }[]

  const navigationItems: NavigationProps = [
    {
      title: 'Search',
      link: '/search',
    },
    {
      title: 'Profile',
      link: '/profile',
    },
    {
      title: 'Library',
      link: '/library',
    },
    {
      title: 'Discover',
      link: '/discover',
    },
  ]

  return (
    <nav>
      <ul className="flex w-full flex-row gap-10 py-5 text-white">
        {navigationItems.map((navigationItem) => (
          <li
            key={navigationItem.title}
            className={clsx(
              'text-sm uppercase decoration-4 underline-offset-8',
              pathname === navigationItem.link ? 'cursor-default underline decoration-sky-700' : 'hover:underline hover:decoration-sky-900'
            )}
          >
            <Link href={navigationItem.link}>{navigationItem.title}</Link>
          </li>
        ))}

        <button className="ml-auto" onClick={() => signOut()}>
          Sign out
        </button>
      </ul>
    </nav>
  )
}
