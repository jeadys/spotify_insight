'use server'

import { fetchWrapper } from '@/server/useFetchWrapper'

/**
 * Get a track
 *
 * GET /v1/tracks/{id}
 * https://developer.spotify.com/web-api/get-track/
 * @param {string} trackId The Spotify ID for the track.
 * @returns {Promise}
 */
export const getTrackById = async (trackId: string): Promise<SpotifyApi.SingleTrackResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/tracks/${trackId}`, method: 'GET' })
}

/**
 * Get audio features for a track
 *
 * GET /v1/audio-features/{id}
 * https://developer.spotify.com/web-api/get-audio-features/
 * @param {string} trackId The Spotify ID for the track.
 * @returns {Promise}
 */
export const getAudioFeaturesForTrack = async (trackId: string): Promise<SpotifyApi.AudioFeaturesResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/audio-features/${trackId}`, method: 'GET' })
}

/**
 * Get audio features for several tracks
 *
 * GET /v1/audio-features?ids={ids}
 * https://developer.spotify.com/get-several-audio-features/
 */
export const getAudioFeaturesForMultipleTracks = async (trackIds: string[]): Promise<SpotifyApi.MultipleAudioFeaturesResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/audio-features?ids=${trackIds}`, method: 'GET' })
}

/**
 * Get Audio Analysis for a Track
 *
 * GET /v1/audio-analysis/{id}
 * https://developer.spotify.com/web-api/get-audio-analysis/
 *
 * At the time of typing, the Audio Analysis Object is absent from the Object Model, so it is typed as any.
 * Object Model: https://developer.spotify.com/web-api/object-model/
 * @param {string} trackId The Spotify ID for the track.
 * @returns {Promise}
 */
export const getAudioAnalysisForTrack = async (trackId: string): Promise<SpotifyApi.AudioAnalysisResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/audio-analysis/${trackId}`, method: 'GET' })
}
