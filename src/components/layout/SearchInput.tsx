import React from 'react'

import { SearchIcon } from '@heroicons/react/solid'

type Props = {
  value: string
  placeholder: string
  inputRef: React.RefObject<HTMLInputElement>
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function SearchInput({ value, placeholder, inputRef, onChange }: Props) {
  return (
    <form className="flex w-full flex-row items-center gap-2 rounded-full border-solid bg-gray-1200 py-1 px-3 text-sm text-white sm:w-80">
      <SearchIcon className="h-8 w-8" />
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        ref={inputRef}
        onChange={onChange}
        className="w-full bg-transparent py-2 focus:outline-none"
      />
    </form>
  )
}
