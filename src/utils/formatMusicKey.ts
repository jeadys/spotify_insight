/**
 * Returns a human-readable representation of a music key.
 *
 * @param {number} note - The music key of the track, represented as a number from 0 to 11.
 * @returns {string} - A string representing the corresponding music key, or 'N/A' if the input is invalid.
 *
 * @example
 * // returns 'C'
 * formatMusicKey(0)
 *
 * @example
 * // returns 'C♯, D♭'
 * formatMusicKey(1)
 *
 * @example
 * // returns 'N/A'
 * formatMusicKey(12)
 */
export const formatMusicKey = (note: number): string => {
  const musicKeys = ['C', 'C♯, D♭', 'D', 'D♯, E♭', 'E', 'F', 'F♯, G♭', 'G', 'G♯, A♭', 'A', 'A♯, B♭', 'B']

  return musicKeys[note] ? musicKeys[note] : 'N/A'
}
