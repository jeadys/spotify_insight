'use server'

import { fetchWrapper } from '@/server/useFetchWrapper'

/**
 * Get a list of new releases
 *
 * GET /v1/browse/new-releases
 * https://developer.spotify.com/web-api/get-list-new-releases/
 * @returns {Promise}
 */
export const getNewReleases = async (limit: number): Promise<SpotifyApi.ListOfNewReleasesResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/browse/new-releases?limit=${limit}`, method: 'GET' })
}

/**
 * Get a list of featured playlists
 *
 * GET /v1/browse/featured-playlists
 * https://developer.spotify.com/web-api/get-list-featured-playlists/
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getFeaturedPlaylists = async (limit: number): Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}`, method: 'GET' })
}

/**
 * Get a list of categories
 *
 * GET /v1/browse/categories
 * https://developer.spotify.com/web-api/get-list-categories/
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getCategories = async (limit: number): Promise<SpotifyApi.MultipleCategoriesResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/browse/categories?limit=${limit}`, method: 'GET' })
}

/**
 * Get a categorys playlists
 *
 * GET /v1/browse/categories/{id}/playlists
 * https://developer.spotify.com/web-api/get-categorys-playlists/
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getCategoryPlaylists = async (categoryId: string, limit: number): Promise<SpotifyApi.CategoryPlaylistsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists/?limit=${limit}`, method: 'GET' })
}

/**
 * Search for artists/albums/tracks/playlists/show/episode
 *
 * GET /v1/search
 * https://developer.spotify.com/web-api/search-item/
 * @param {string} query The search term
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getSearchItems = async (query: string, limit: number): Promise<SpotifyApi.SearchResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/search?q=${query}&type=artist,album,track&limit=${limit}`, method: 'GET' })
}

/**
 * Search for artists/albums/tracks/playlists/show/episode
 *
 * GET /v1/search
 * https://developer.spotify.com/web-api/search-item/
 * @param {string} query The search term
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getSearchSeeds = async (query: string, limit: number): Promise<SpotifyApi.SearchResponse> => {
  return fetchWrapper({
    url: `https://api.spotify.com/v1/search?q=${query}&type=artist,track&limit=${limit}`,
    method: 'GET',
  })
}

/**
 * Search for artists/albums/tracks/playlists/show/episode
 *
 * GET /v1/search
 * https://developer.spotify.com/web-api/search-item/
 * @param {string} query The search term
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getArtistBasedOnGenre = async (query: string, limit: number): Promise<SpotifyApi.SearchResponse> => {
  return fetchWrapper({
    url: `https://api.spotify.com/v1/search?q=genre:"${query}"&type=artist,track&limit=${limit}`,
    method: 'GET',
  })
}
