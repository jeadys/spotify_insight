import { useEffect, useState } from 'react'

/**
 *A hook that uses a store function to retrieve and return data.
 *The store function is responsible for invoking a callback function with the current state and returning a result.
 *The returned result is stored in state and returned by the hook.
 *@param {function} store - The store function that retrieves the data. The store function should accept a callback function that is called with the current state.
 *@param {function} callback - The callback function that is passed to the store function. This function should return the desired data.
 *@returns {any} The data returned by the callback function passed to the store function.
 */
export const useStore = <T, F>(store: (callback: (state: T) => unknown) => unknown, callback: (state: T) => F) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}
