/**
 * Calculates the total number of bars in a full track
 * @param {number} durationMs The duration of the track in milliseconds
 * @param {number} tempo The tempo (BPM) of the track
 * @param {number} timeSignature The number of beats in every measure (time signature)
 * @returns {string} The total number of bars in the track
 * @example calculateTotalBars(240000, 120, 4) // returns '64'
 */
export const calculateTotalBars = (durationMs: number, tempo: number, timeSignature: number): string => {
  const bars = ((durationMs / 1000) * tempo) / (60 * timeSignature)

  return Math.round(bars).toString()
}
