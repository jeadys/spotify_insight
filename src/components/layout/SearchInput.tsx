import type { Dispatch, SetStateAction } from 'react'
import React from 'react'

import { SearchIcon, XIcon } from '@heroicons/react/solid'

import { useFocus } from '@/hooks/useFocus'

type Props = {
  value: string
  placeholder: string
  setSearch: Dispatch<SetStateAction<string>>
}

export const SearchInput = ({ value, placeholder, setSearch }: Props) => {
  const { inputRef, focus } = useFocus()

  return (
    <div className="relative w-full text-white sm:max-w-xs">
      <form>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          ref={inputRef}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full rounded-full border-2 border-transparent bg-gray-1200 px-12 text-sm hover:bg-gray-1100 focus:border-slate-200 focus:outline-none"
        />
      </form>
      <div className="pointer-events-none absolute bottom-0 top-0 flex w-full items-center justify-between px-4">
        <span className=" cursor-pointer">
          <SearchIcon className=" h-6 w-6 flex-shrink-0 " />
        </span>

        {value && (
          <button
            onClick={() => {
              setSearch('')
              focus()
            }}
            className="pointer-events-auto"
          >
            <XIcon className="h-6 w-6 flex-shrink-0" />
          </button>
        )}
      </div>
    </div>
  )
}
