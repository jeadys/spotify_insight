import Link from 'next/link'
import { useRouter } from 'next/router'

import Search from './Search'

export default function Navigation() {
  const { pathname } = useRouter()

  const items = [
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
    <ul className="flex w-full flex-row gap-10 py-5 text-white">
      {items.map((item) => (
        <li
          key={item.title}
          className={`text-sm uppercase decoration-4 underline-offset-8 ${
            pathname === item.link ? 'cursor-default underline decoration-sky-700' : 'hover: decoration-sky-900 hover:underline'
          }`}
        >
          <Link href={item.link}>{item.title}</Link>
        </li>
      ))}

      <li className="ml-auto">
        <Search />
      </li>
    </ul>
  )
}
