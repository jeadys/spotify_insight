'use client'

import type { ReactElement } from 'react'
import { useEffect, useRef, useState } from 'react'

import { AdjustmentsIcon, LogoutIcon, SearchIcon, UserIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

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
      icon: <SearchIcon className="mr-2 h-6 w-6" />,
    },
    {
      title: 'Profile',
      link: '/profile',
      icon: <UserIcon className="mr-2 h-6 w-6 " />,
    },
    {
      title: 'Generator',
      link: '/generator',
      icon: <AdjustmentsIcon className="mr-2 h-6 w-6 rotate-90" />,
    },
  ]
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!menuRef.current) return
      if (!menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  return (
    <nav ref={menuRef} className="relative text-sm uppercase">
      <ul className="flex w-full flex-row justify-end gap-5 py-5 text-white">
        <div className="mr-auto flex items-center">
          <span className="text-xs">Powered By</span>
          <Image
            src="/icons/spotify.svg"
            alt="Spotify"
            width="0"
            height="0"
            sizes="100vw"
            className="mx-2 h-6 w-6 rounded-md fill-green-300"
          />
          <span className="text-xs">API</span>
        </div>
        {navigationItems.map((navigationItem) => (
          <li key={navigationItem.title} className="hidden lg:block">
            <Link className="flex items-center rounded-md p-2 hover:bg-gray-1100" href={navigationItem.link}>
              {navigationItem.icon}
              {navigationItem.title}
            </Link>
          </li>
        ))}

        <button className="ml-auto hidden lg:block" onClick={() => signOut()}>
          <span className="flex items-center rounded-md p-2 hover:bg-gray-1100">
            <LogoutIcon className="mr-2 h-6 w-6" />
            <span className="uppercase">Sign out</span>
          </span>
        </button>

        {/* Dropdown menu */}
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="lg:hidden">
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
      </ul>

      {isDropdownOpen && (
        <ul className="absolute right-0 z-30 w-1/2 max-w-max rounded-md border border-gray-700 bg-gray-1200 text-white lg:hidden">
          {navigationItems.map((navigationItem) => (
            <li key={navigationItem.title} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Link href={navigationItem.link} className="flex items-center rounded-md px-4 py-2 hover:bg-gray-1100">
                {navigationItem.icon}
                {navigationItem.title}
              </Link>
            </li>
          ))}

          <hr className="my-2" />

          <button className="block w-full rounded-md px-4 py-2 text-left uppercase hover:bg-gray-1100" onClick={() => signOut()}>
            <span className="flex items-center  hover:bg-gray-1100">
              <LogoutIcon className="mr-2 h-6 w-6" />
              <span className="uppercase">Sign out</span>
            </span>
          </button>
        </ul>
      )}
    </nav>
  )
}
