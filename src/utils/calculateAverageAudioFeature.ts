/**
 * Calculates the average audio features for a collection of tracks.
 *
 * @param {SpotifyApi.MultipleAudioFeaturesResponse} audioFeatures - The audio features data for multiple tracks.
 * @param {number} totalTracks - The total number of tracks to calculate the average for.
 * @returns {AverageAudioFeature} - An object containing the average values for danceability, energy, speechiness, acousticness, liveness, and valence.
 *
 * @description
 * This function takes audio feature data for multiple tracks and calculates their average values.
 * It handles cases where some tracks may not have audio features by skipping them.
 *
 * Example usage:
 * const averageFeatures = calculateAverageAudioFeatures(audioFeatures, totalTracks) // returns object containing average values;
 */

type AverageAudioFeature = {
  danceability: number
  energy: number
  speechiness: number
  acousticness: number
  liveness: number
  valence: number
}

export const calculateaverageAudioFeature = (
  audioFeatures: SpotifyApi.MultipleAudioFeaturesResponse,
  totalTracks: number
): AverageAudioFeature => {
  const { danceability, energy, speechiness, acousticness, liveness, valence } = audioFeatures.audio_features.reduce(
    (accumulator, track) => {
      if (track) {
        accumulator.danceability += track.danceability
        accumulator.energy += track.energy
        accumulator.speechiness += track.speechiness
        accumulator.acousticness += track.acousticness
        accumulator.liveness += track.liveness
        accumulator.valence += track.valence
      }
      return accumulator
    },
    {
      danceability: 0,
      energy: 0,
      speechiness: 0,
      acousticness: 0,
      liveness: 0,
      valence: 0,
    } satisfies AverageAudioFeature
  )

  return {
    danceability: danceability / totalTracks,
    energy: energy / totalTracks,
    speechiness: speechiness / totalTracks,
    acousticness: acousticness / totalTracks,
    liveness: liveness / totalTracks,
    valence: valence / totalTracks,
  }
}
