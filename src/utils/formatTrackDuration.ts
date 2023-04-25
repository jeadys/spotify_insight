/**
 * Formats a track duration given in milliseconds to a human-readable string in the format "M:SS".
 *
 * @param {number} milliseconds - The duration of the track in milliseconds.
 * @returns {string} - A string in the format "M:SS" representing the duration of the track.
 *
 * @example
 * // returns "3:36" for a track duration of 216699 milliseconds (3 minutes and 36 seconds)
 * formatTrackDuration(216699)
 *
 * @example
 * // returns "0:02" for a track duration of 2000 milliseconds (2 seconds)
 * formatTrackDuration(2000)
 */
export const formatTrackDuration = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
