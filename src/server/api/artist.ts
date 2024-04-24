'use server'

import { fetchWrapper } from '@/server/useFetchWrapper'

/**
 * Get an Artist
 *
 * GET /v1/artists/{id}
 * https://developer.spotify.com/web-api/get-artist/
 * @param {string} artistId
 * @returns {Promise}
 */
export const getArtistById = async (artistId: string): Promise<SpotifyApi.SingleArtistResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/artists/${artistId}`, method: 'GET' })
}

/**
 * Get an Artist’s Top Tracks
 *
 * GET /v1/artists/{id}/top-tracks
 * https://developer.spotify.com/web-api/get-artists-top-tracks/
 * @param {string} artistId
 * @returns {Promise}
 */
export const getArtistTopTracks = async (artistId: string): Promise<SpotifyApi.ArtistsTopTracksResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, method: 'GET' })
}

/**
 * Get an Artist’s Albums
 *
 * GET /v1/artists/{id}/albums
 * https://developer.spotify.com/web-api/get-artists-albums/
 * @param {string} artistId
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getArtistAlbums = async (artistId: string, limit: number): Promise<SpotifyApi.ArtistsAlbumsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/artists/${artistId}/albums?market=US&limit=${limit}`, method: 'GET' })
}

/**
 * Get an Artist’s Related Artists
 *
 * GET /v1/artists/{id}/related-artists
 * https://developer.spotify.com/web-api/get-related-artists/
 * @param {string} artistId The Spotify ID for the artist
 * @returns {Promise}
 */
export const getArtistRelatedArtists = async (artistId: string): Promise<SpotifyApi.ArtistsRelatedArtistsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/artists/${artistId}/related-artists`, method: 'GET' })
}
