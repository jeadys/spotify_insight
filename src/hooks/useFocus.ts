import { useEffect, useRef } from 'react'

export default function useFocus() {
  const inputRef = useRef<HTMLInputElement>(null)

  const focus = () => {
    if (inputRef.current) inputRef.current.focus()
  }

  useEffect(() => {
    focus()
  }, [])

  return { inputRef, focus }
}
