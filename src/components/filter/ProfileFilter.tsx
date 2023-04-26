'use client'

import { useProfileFilterStore } from 'store/useProfileFilter'

type ProfileFilterProps = {
  title: string
  term: 'short_term' | 'medium_term' | 'long_term'
}[]

export default function ProfileFilter() {
  const profileFilterItems: ProfileFilterProps = [
    {
      title: '4 Weeks',
      term: 'short_term',
    },
    {
      title: '6 Months',
      term: 'medium_term',
    },
    {
      title: 'Lifetime',
      term: 'long_term',
    },
  ]

  const setProfileFilter = useProfileFilterStore((state) => state.setProfileFilter)
  const term = useProfileFilterStore((state) => state.term)

  return (
    <div className="flex flex-row gap-5">
      {profileFilterItems.map((profileFilterItem) => (
        <button
          disabled={term === profileFilterItem.term ? true : false}
          key={profileFilterItem.title}
          className={`${
            term === profileFilterItem.term ? 'text-white underline decoration-blue-300' : 'hover:text-white'
          } rounded-md p-2 text-sm font-semibold uppercase text-gray-400 decoration-4 underline-offset-8`}
          onClick={() => setProfileFilter(profileFilterItem.term, profileFilterItem.title)}
        >
          {profileFilterItem.title}
        </button>
      ))}
    </div>
  )
}
