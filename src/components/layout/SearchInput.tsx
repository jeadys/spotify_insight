import type { Dispatch, SetStateAction } from 'react'
import React from 'react'

import { SearchIcon, XIcon } from '@heroicons/react/solid'

type Props = {
  value: string
  placeholder: string
  inputRef: React.RefObject<HTMLInputElement>
  setSearch: Dispatch<SetStateAction<string>>
}

export default function SearchInput({ value, placeholder, inputRef, setSearch }: Props) {
  return (
    <form className="flex w-full flex-row items-center gap-2 rounded-full border-solid bg-gray-1200 py-1 px-3 text-sm text-white sm:w-80">
      <SearchIcon className="h-6 w-6 flex-shrink-0" />
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        ref={inputRef}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent py-2 focus:outline-none"
      />
      <span>{value && <XIcon className="h-6 w-6 flex-shrink-0" onClick={() => setSearch('')} />}</span>
    </form>
  )
}
