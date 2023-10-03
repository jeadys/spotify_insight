'use client'

import type { ReactElement } from 'react'
import { useEffect, useState } from 'react'

import { AdjustmentsIcon, LogoutIcon, SearchIcon, UserIcon, BookmarkIcon } from '@heroicons/react/outline'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  type NavigationProps = {
    title: string
    link: string
    icon?: ReactElement
  }[]

  const navigationItems: NavigationProps = [
    {
      title: 'Search',
      link: '/search',
      icon: <SearchIcon className="mr-2 h-6 w-6 text-white" />,
    },
    {
      title: 'Profile',
      link: '/profile',
      icon: <UserIcon className="mr-2 h-6 w-6 text-white" />,
    },
    // {
    //   title: 'Library',
    //   link: '/library',
    //   icon: <BookmarkIcon className="mr-2 h-6 w-6 text-white" />,
    // },
    {
      title: 'Generator',
      link: '/generator',
      icon: <AdjustmentsIcon className="mr-2 h-6 w-6 text-white" />,
    },
  ]

  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    setIsDropdownOpen(false)
  }, [pathname])

  return (
    <nav className="relative text-sm uppercase">
      <ul className="flex w-full flex-row justify-end gap-5 py-5 text-white">
        <div className="mr-auto flex items-center">
          <span className="text-xs">Powered By</span>
          <Image src="/icons/spotify.svg" alt="Spotify" width="0" height="0" sizes="100vw" className="h-6 w-6 rounded-md fill-green-300 mx-2" />
          <span className="text-xs">API</span>
        </div>
        {navigationItems.map((navigationItem) => (
          <li key={navigationItem.title} className={'hidden rounded-md hover:bg-gray-1100 lg:block'}>
            <Link className="flex items-center p-2" href={navigationItem.link}>
              {navigationItem.icon}
              {navigationItem.title}
            </Link>
          </li>
        ))}

        <button
          className="ml-auto flex flex-row rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white lg:hidden"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>

        <button className="ml-auto hidden lg:block" onClick={() => signOut()}>
          <span className="flex items-center rounded-md p-2 hover:bg-gray-1100">
            <LogoutIcon className="mr-2 h-6 w-6 text-white" />
            <span className="uppercase">Sign out</span>
          </span>
        </button>
      </ul>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <ul className="absolute right-0 z-30 w-1/2 max-w-max rounded-md bg-gray-1200 lg:hidden">
          {navigationItems.map((navigationItem) => (
            <li key={navigationItem.title}>
              <Link href={navigationItem.link} className="flex items-center py-2 px-4 text-white hover:bg-gray-1100">
                {navigationItem.icon}
                {navigationItem.title}
              </Link>
            </li>
          ))}
          <hr className="my-2" />
          <button className="block w-full py-2 px-4 text-left uppercase text-white hover:bg-gray-1100" onClick={() => signOut()}>
            <span className="flex items-center rounded-md hover:bg-gray-1100">
              <LogoutIcon className="mr-2 h-6 w-6 text-white" />
              <span className="uppercase">Sign out</span>
            </span>
          </button>
        </ul>
      )}
    </nav>
  )
}
