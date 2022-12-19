'use client'

import { useEffect, useState, useRef } from 'react'

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
    <>
      <input
        type="text"
        value={search}
        placeholder="What do you want to listen to?"
        onChange={(e) => setSearch(e.target.value)}
        className="w-72 border-b-2 border-b-cyan-700 bg-transparent text-white placeholder-gray-400 outline-none focus:border-b-cyan-800"
        ref={inputRef}
        role="combobox"
        aria-expanded="false"
        aria-controls="options"
      />
    </>
  )
}
