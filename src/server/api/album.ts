'use server'

import { fetchWrapper } from '@/server/useFetchWrapper'

/**
 * Get an Album
 *
 * GET /v1/albums/{id}
 * https://developer.spotify.com/web-api/get-album/
 * @param {string} albumId
 * @returns {Promise}
 */
export const getAlbumById = async (albumId: string): Promise<SpotifyApi.SingleAlbumResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/albums/${albumId}`, method: 'GET' })
}

/**
 * Get an Album’s Tracks
 *
 * GET /v1/albums/{id}/tracks
 * https://developer.spotify.com/web-api/get-albums-tracks/
 * @param {string} albumId
 * @param {number} limit Total amount of items to return
 */
export const getAlbumTracks = async (albumId: string, limit: number): Promise<SpotifyApi.AlbumTracksResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=${limit}`, method: 'GET' })
}
