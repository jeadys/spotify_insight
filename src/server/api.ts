import { unstable_getServerSession } from 'next-auth'

import { authOptions } from '@/auth/[...nextauth]'

type FetchWrapperProps = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
}

const fetchWrapper = async ({ url, method }: FetchWrapperProps) => {
  const session = await unstable_getServerSession(authOptions)
  if (!session) return null

  try {
    const response = await fetch(url, {
      method,
      cache: 'default',
      next: {
        revalidate: 3600,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.accessToken}`,
      },
    })

    if (!response.ok) throw new Error(`Request to ${url} resulted in a ${response.status}: ${response.statusText}`)

    return response.json()
  } catch (error) {
    if (error instanceof Error) {
      return console.error(error.message)
    }
  }
}

export const getCurrentUsersProfile = async (): Promise<SpotifyApi.CurrentUsersProfileResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me`, method: 'GET' })
}

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
 * Get a playlist
 *
 * GET /v1/playlists/{id}
 * https://developer.spotify.com/web-api/get-playlist/
 * @param {string} playlistId The Spotify ID for the playlist
 * @returns {Promise}
 */
export const getPlaylistById = async (playlistId: string): Promise<SpotifyApi.SinglePlaylistResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/playlists/${playlistId}`, method: 'GET' })
}

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
 * Get a User’s Top Artists and Tracks (Note: This is only Artists)
 *
 * GET /v1/me/top/{type}
 * https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
 * @param {string} timeRange 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getTopArtists = async (timeRange: string, limit: number): Promise<SpotifyApi.UsersTopArtistsResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`, method: 'GET' })
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
  return fetchWrapper({ url: `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`, method: 'GET' })
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
 * Get recommendations based on seeds
 *
 * GET /v1/recommendations
 * https://developer.spotify.com/get-recommendations/
 * @param {PlaylistTrackObject[]} tracks The seeded tracks for the recommendations.
 * @param {number} limit Total amount of items to return
 * @returns {Promise}
 */
export const getRecommendationsForTracks = async (
  tracks: SpotifyApi.PlaylistTrackObject[],
  limit: number
): Promise<SpotifyApi.RecommendationsFromSeedsResponse> => {
  const shuffledTracks = tracks.sort(() => 0.5 - Math.random())
  const seedTracks = shuffledTracks
    .slice(0, 5)
    .map(({ track }) => track.id)
    .join(',')
  const seedArtists = ''
  const seedGenres = ''

  return fetchWrapper({
    url: `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}&seed_artists=${seedArtists}&seed_genres=${seedGenres}&limit=${limit}`,
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
export const getSearchItems = async (query: string, limit: number): Promise<SpotifyApi.SearchResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/search?q=${query}&type=artist,album,track&limit=${limit}`, method: 'GET' })
}

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
