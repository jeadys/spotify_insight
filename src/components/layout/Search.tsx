'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import useDebounce from '@/hooks/useDebounce'
import useFocus from '@/hooks/useFocus'

import SearchInput from './SearchInput'

export default function Search() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)
  const inputRef = useFocus()
  const router = useRouter()

  useEffect(() => {
    router.replace(`search/${debouncedSearch}`)
  }, [router, debouncedSearch])

  return (
    <SearchInput
      value={search}
      placeholder="What do you want to listen to?"
      inputRef={inputRef}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}
