'use server'

import { fetchWrapper } from '@/server/useFetchWrapper'

/**
 * Get Current User’s Profile
 *
 * GET /v1/me
 * https://developer.spotify.com/web-api/get-current-users-profile/
 * @returns {Promise}
 */

export const getCurrentUsersProfile = async (): Promise<SpotifyApi.CurrentUsersProfileResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me`, method: 'GET' })
}

/**
 * Get a User’s Top Artists and Tracks (Note: This is only Artists)
 *
 * GET /v1/me/top/{type}
 * https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
 * @param {string} timeRange 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getTopArtists = async (timeRange: string, limit: number): Promise<SpotifyApi.UsersTopArtistsResponse> => {
  return fetchWrapper({
    url: `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}_term&limit=${limit}`,
    method: 'GET',
  })
}

/**
 * Get a User’s Top Artists and Tracks (Note: This is only Tracks)
 *
 * GET /v1/me/top/{type}
 * https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
 * @param {string} timeRange 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getTopTracks = async (timeRange: string, limit: number): Promise<SpotifyApi.UsersTopTracksResponse> => {
  return fetchWrapper({
    url: `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}_term&limit=${limit}`,
    method: 'GET',
  })
}

/**
 * Get user's saved tracks
 *
 * GET /v1/me/tracks
 * https://developer.spotify.com/web-api/get-users-saved-tracks/
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserSavedTracks = async (limit: number): Promise<SpotifyApi.UsersSavedTracksResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/tracks?limit=${limit}`, method: 'GET' })
}

/**
 * Check User’s Saved Tracks
 *
 * GET /v1/me/tracks/contains?ids={ids}
 * https://developer.spotify.com/web-api/check-users-saved-tracks/
 * @param {string} trackIds A comma-separated list of the Spotify IDs for the tracks
 * @returns {Promise}
 */
export const getDoesUserHaveTrackSaved = async (trackIds: string): Promise<SpotifyApi.CheckUsersSavedTracksResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/tracks/contains?ids=${trackIds}`, method: 'GET' })
}

/**
 * Save tracks for user
 *
 * PUT /v1/me/tracks?ids={ids}
 * https://developer.spotify.com/web-api/save-tracks-user/
 * @param {string} trackIds A comma-separated list of the Spotify IDs for the tracks
 * @returns {Promise}
 */
export const saveTrackForCurrentUser = async (trackIds: string): Promise<SpotifyApi.SaveTracksForUserResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/tracks?ids=${trackIds}`, method: 'PUT' })
}

/**
 * Remove User’s Saved Tracks
 *
 * DELETE /v1/me/tracks?ids={ids}
 * https://developer.spotify.com/web-api/remove-tracks-user/
 * @param {string} trackIds A comma-separated list of the Spotify IDs for the tracks
 * @returns {Promise}
 */
export const removeTrackForCurrentUser = async (trackIds: string): Promise<SpotifyApi.RemoveUsersSavedTracksResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/tracks?ids=${trackIds}`, method: 'DELETE' })
}

/**
 * Get User’s Followed Artists
 *
 * GET /v1/me/following
 * https://developer.spotify.com/web-api/get-followed-artists/
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserFollowedArtists = async (limit: number): Promise<SpotifyApi.UsersFollowedArtistsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}`, method: 'GET' })
}

/**
 * Check if User Follows Users or Artists
 *
 * GET /v1/me/following/contains
 * https://developer.spotify.com/web-api/check-current-user-follows/
 * @param {string} artistIds A comma-separated list of the Spotify IDs for the artists
 * @returns {Promise}
 */
export const getDoesUserFollowArtist = async (artistIds: string): Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/following/contains?type=artist&ids=${artistIds}`, method: 'GET' })
}

/**
 * Follow artists or users
 *
 * PUT /v1/me/following
 * https://developer.spotify.com/web-api/follow-artists-users/
 * @param {string} artistIds A comma-separated list of the Spotify IDs for the artists
 * @returns {Promise}
 */
export const followArtistForCurrentUser = async (artistIds: string): Promise<SpotifyApi.FollowArtistsOrUsersResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/following?type=artist&ids=${artistIds}`, method: 'PUT' })
}

/**
 * Unfollow artists or users
 *
 * DELETE /v1/me/following
 * https://developer.spotify.com/web-api/unfollow-artists-users/
 * @param {string} artistIds A comma-separated list of the Spotify IDs for the artists
 * @returns {Promise}
 */
export const unfollowArtistForCurrentUser = async (artistIds: string): Promise<SpotifyApi.UnfollowArtistsOrUsersResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/following?type=artist&ids=${artistIds}`, method: 'DELETE' })
}

/**
 * Get user's saved albums
 *
 * GET /v1/me/albums
 * https://developer.spotify.com/web-api/get-users-saved-albums/
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserSavedAlbums = async (limit: number): Promise<SpotifyApi.UsersSavedAlbumsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/albums?limit=${limit}`, method: 'GET' })
}

/**
 * Check user's saved albums
 *
 * GET /v1/me/albums/contains?ids={ids}
 * https://developer.spotify.com/web-api/check-users-saved-albums/
 * @param {string} albumIds A comma-separated list of the Spotify IDs for the albums
 * @returns {Promise}
 */
export const getDoesUserHaveAlbumSaved = async (albumIds: string): Promise<SpotifyApi.CheckUserSavedAlbumsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/albums/contains?ids=${albumIds}`, method: 'GET' })
}

/**
 * Save albums for user
 *
 * PUT /v1/me/albums?ids={ids}
 * https://developer.spotify.com/web-api/save-albums-user/
 * @param {string} albumIds A comma-separated list of the Spotify IDs for the albums
 * @returns {Promise}
 */
export const saveAlbumForCurrentUser = async (albumIds: string): Promise<SpotifyApi.SaveAlbumsForUserResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/albums?ids=${albumIds}`, method: 'PUT' })
}

/**
 * Remove Albums for Current User
 *
 * DELETE /v1/me/albums?ids={ids}
 * https://developer.spotify.com/web-api/remove-albums-user/
 * @param {string} albumIds A comma-separated list of the Spotify IDs for the albums
 * @returns {Promise}
 */
export const removeAlbumForCurrentUser = async (albumIds: string): Promise<SpotifyApi.RemoveAlbumsForUserResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/albums?ids=${albumIds}`, method: 'DELETE' })
}

/**
 * Get a list of the current user's playlists
 *
 * GET /v1/me/playlists
 * https://developer.spotify.com/web-api/get-list-users-playlists/
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserSavedPlaylists = async (limit: number): Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/playlists?limit=${limit}`, method: 'GET' })
}

/**
 * Get a User’s Recently Played Tracks
 *
 * GET /v1/me/player/recently-played
 * https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getRecentlyPlayedTracks = async (limit: number): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, method: 'GET' })
}
