'use client'

import { useEffect, useState, useRef } from 'react'

import { SearchIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/navigation'

import useDebounce from '@/hooks/useDebounce'

export default function Search() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    router.replace(`search/${debouncedSearch}`)

    if (inputRef.current) inputRef.current.focus()
  }, [router, debouncedSearch])

  return (
    <form className="flex w-80 flex-row items-center gap-2 rounded-full border-solid bg-gray-1200 py-1 px-3 text-sm text-white">
      <SearchIcon className="h-8 w-8" />
      <input
        type="search"
        value={search}
        ref={inputRef}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="What do you want to listen to?"
        className="w-full bg-transparent py-2 focus:outline-none"
      />
    </form>
  )
}
