import dayjs from 'dayjs'

import { MergedTrackAndAudioFeatureObject } from '@/components/analysis/TrackAudioFeatureScatter'

/**
 * Merges Spotify track information with audio features to create a new array of objects
 * representing tracks along with their associated audio features.
 *
 * @param tracks - An array of Spotify track objects (SpotifyApi.TrackObjectFull) containing track information.
 * @param trackAudioFeatures - Spotify audio features response (SpotifyApi.MultipleAudioFeaturesResponse)
 * @returns An array of MergedTrackAndAudioFeatureObject objects, where each object represents a track
 *          with associated audio features. If audio features are missing for a track, they will be undefined.
 */
export const mergeTracksWithAudioFeatures = (
  tracks: SpotifyApi.TrackObjectFull[],
  trackAudioFeatures: SpotifyApi.MultipleAudioFeaturesResponse
) => {
  const mergeTracksWithAudioFeatures: MergedTrackAndAudioFeatureObject[] = tracks.map((track) => {
    const audioFeatures = trackAudioFeatures.audio_features.find((trackAudioFeature) => trackAudioFeature.id === track.id)

    return {
      danceability: audioFeatures?.danceability,
      energy: audioFeatures?.energy,
      popularity: track.popularity,
      valence: audioFeatures?.valence,
      loudness: audioFeatures?.loudness,
      instrumentalness: audioFeatures?.instrumentalness,
      acousticness: audioFeatures?.acousticness,
      tempo: audioFeatures?.tempo,
      liveness: audioFeatures?.liveness,
      speechiness: audioFeatures?.speechiness,
      duration: track.duration_ms,
      release: dayjs(track.album.release_date).unix(),
      name: track.name,
      artist: track.artists[0].name,
      image: track.album?.images?.[2]?.url || '/images/nocover.webp',
    }
  })

  return mergeTracksWithAudioFeatures
}
