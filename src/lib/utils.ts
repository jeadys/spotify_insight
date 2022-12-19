/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
export const generateRandomString = (length: number): string => {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

/**
 * Format track duration to human readable version
 * @param {number} milliseconds Number of milliseconds
 * @returns {string} Formatted track duration
 * @example 216699 -> '3:36'
 */
export const formatTrackDuration = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

/**
 * Format follow count to human readable version
 * @param {number} number Follower count
 * @param {number} digits Amount digits after comma
 * @returns {string} Formatted follow count
 * @example 299792458 -> '299.8M'
 */
export const formatFollowCount = (number: number, digits: number): string => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return number >= item.value
    })

  return item ? (number / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0'
}

/**
 * Prevents further propagation of the current event in the capturing and bubbling phases
 */
export const stopProp = (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation()
}

// Get year from YYYY-MM-DD
export const getYear = (date: string): string => date.split('-')[0]
