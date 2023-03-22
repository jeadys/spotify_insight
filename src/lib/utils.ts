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

  return item ? (number / item.value).toFixed(item.symbol === 'k' ? 0 : digits).replace(rx, '$1') + item.symbol : '0'
}

/**
 * Format music key to human readable version
 * @param {number} note Music key of the track
 * @returns {string} Human readable music key
 */
export const getMusicKeyOfTrack = (note: number): string => {
  switch (note) {
    case 0:
      return 'C'
    case 1:
      return 'C♯, D♭'
    case 2:
      return 'D'
    case 3:
      return 'D♯, E♭'
    case 4:
      return 'E'
    case 5:
      return 'F'
    case 6:
      return 'F♯, G♭'
    case 7:
      return 'G'
    case 8:
      return 'G♯, A♭'
    case 9:
      return 'A'
    case 10:
      return 'A♯, B♭'
    case 11:
      return 'B'
    default:
      return 'N/A'
  }
}

/**
 * How many bars in a full track
 * @param {number} durationMs Duration of track in milliseconds
 * @param {number} note Tempo (BPM) of the track
 * @param {number} timeSignature Beats in every measure
 * @returns {string} Total bars of track
 */
export const calculateTotalBars = (durationMs: number, tempo: number, timeSignature: number): string => {
  const bars = ((durationMs / 1000) * tempo) / (60 * timeSignature)
  return Math.round(bars).toString()
}

/**
 * How many beats in a full track
 * @param {number} durationMs Duration of track in milliseconds
 * @param {number} note Tempo (BPM) of the track
 * @returns {string} Total beats of track
 */
export const calculateTotalBeats = (durationMs: number, tempo: number): string => {
  const beats = (durationMs / 60000) * tempo
  return Math.round(beats).toString()
}
