'use client'

import type { ReactElement } from 'react'
import { useState } from 'react'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

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
    },
    {
      title: 'Profile',
      link: '/profile',
    },
    {
      title: 'Library',
      link: '/library',
    },
  ]

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <nav className="text-sm uppercase">
      <ul className="flex w-full flex-row justify-end gap-5 py-5 text-white">
        <div className="mr-auto">LOGO</div>
        {navigationItems.map((navigationItem) => (
          <li key={navigationItem.title} className={'hidden rounded-md hover:bg-gray-1100 lg:block'}>
            <Link className="block p-2" href={navigationItem.link}>
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

        {/* <button className="ml-auto hidden lg:block" onClick={() => signOut()}>
          Sign out
        </button> */}
      </ul>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <ul className="lg:hidden">
          <li>
            {navigationItems.map((navigationItem) => (
              <Link
                key={navigationItem.title}
                href={navigationItem.link}
                className="block py-2 px-4 text-white hover:rounded-md hover:bg-gray-1100"
              >
                {navigationItem.title}
              </Link>
            ))}
          </li>
          {/* <button className="block py-2 px-4 text-white hover:bg-gray-1100" onClick={() => signOut()}>
            Sign out
          </button> */}
        </ul>
      )}
    </nav>
  )
}
