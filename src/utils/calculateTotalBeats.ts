/**
 * Calculates the total beats in a track given the duration in milliseconds and tempo in BPM.
 * @param {number} durationMs The duration of the track in milliseconds.
 * @param {number} tempo The tempo (BPM) of the track.
 * @returns {string} The total beats in the track.
 * @example calculateTotalBeats(240000, 120) // returns '4800'
 */
export const calculateTotalBeats = (durationMs: number, tempo: number): string => {
  const beats = (durationMs / 60000) * tempo

  return Math.round(beats).toString()
}
