'use client'

import { useEffect, useState } from 'react'

/**
 *
 *A hook that debounces a value and returns the debounced value.
 *@param {string} value The value to debounce
 *@param {number} delay The delay in milliseconds to wait before updating the debounced value
 *@returns {string} The debounced value
 */
export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
