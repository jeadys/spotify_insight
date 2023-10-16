'use client'

import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { SearchInput } from '@/components/layout/SearchInput'
import { useDebounce } from '@/hooks/useDebounce'

export const Search = () => {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 1000)
  const router = useRouter()

  useEffect(() => {
    router.replace(!debouncedSearch ? '/search' : `/search/${debouncedSearch}`)
  }, [router, debouncedSearch])

  return <SearchInput value={search} placeholder="What do you want to listen to?" setSearch={setSearch} />
}
