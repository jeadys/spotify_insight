'use client'

import { useEffect, useRef } from 'react'

export const useFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const focus = () => {
    if (inputRef.current) inputRef.current.focus()
  }

  useEffect(() => {
    focus()
  }, [])

  return { inputRef, focus }
}
