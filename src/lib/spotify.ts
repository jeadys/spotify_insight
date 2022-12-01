import type { AxiosResponse } from 'axios'

import UseAxios from '../hooks/useAxios'
import { generateRandomString } from '../lib/utils'
import type { IAlbum } from './interfaces/album'
import type { IArtist } from './interfaces/artist'
import type { IArtistsAlbums } from './interfaces/artist-album'
import type { IArtistsRelatedArtists } from './interfaces/artist-related-artists'
import type { IArtistsTopTracks } from './interfaces/artist-top-tracks'
import type { ICategories } from './interfaces/categories'
import type { ICategoryPlaylist } from './interfaces/category-playlist'
import type { IFeaturedPlaylists } from './interfaces/featured-playlists'
import type { INewReleases } from './interfaces/new-releases'
import type { IPlaylist, IPlaylistItem, IPlaylistTracks } from './interfaces/playlist'
import type { IRecommendations } from './interfaces/recommendations'
import type { ISearchTracks } from './interfaces/search-tracks'
import type { IUser } from './interfaces/user'
import type { IUsersFollowedArtists } from './interfaces/user-followed-artists'
import type { IUsersSavedAlbums } from './interfaces/user-saved-albums'
import type { IUsersSavedPlaylists } from './interfaces/user-saved-playlists'
import type { IUsersSavedTracks } from './interfaces/user-saved-tracks'
import type { IUsersTopArtists } from './interfaces/user-top-artists'
import type { IUsersTopTracks } from './interfaces/users-top-tracks'

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID!
const state = generateRandomString(16)
const scope =
  'user-read-private user-read-email user-top-read user-follow-read user-library-read user-read-playback-state user-modify-playback-state streaming user-follow-modify user-library-modify'

const queryParams = {
  client_id: clientId,
  response_type: 'code',
  state: state,
  scope: scope,
}

const queryParamString = new URLSearchParams(queryParams)
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`

export { LOGIN_URL }

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = (): Promise<AxiosResponse<IUser>> => {
  return UseAxios({ url: '/me' })
}

/**
 * Get Current User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
 * @param {string} timeRange - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getTopArtists = (timeRange: string, limit: number): Promise<AxiosResponse<IUsersTopArtists>> => {
  return UseAxios({
    url: `/me/top/artists?time_range=${timeRange}&limit=${limit}`,
  })
}

/**
 * Get Current User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
 * @param {string} timeRange - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getTopTracks = (timeRange: string, limit: number): Promise<AxiosResponse<IUsersTopTracks>> => {
  return UseAxios({
    url: `/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
  })
}

/**
 * Get Current User's Saved Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserSavedPlaylists = (limit: number): Promise<AxiosResponse<IUsersSavedPlaylists>> => {
  return UseAxios({ url: `/me/playlists?limit=${limit}` })
}

/**
 * Get Current User's Saved Albums
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-albums
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserSavedAlbums = (limit: number): Promise<AxiosResponse<IUsersSavedAlbums>> => {
  return UseAxios({ url: `/me/albums?limit=${limit}` })
}

/**
 * Get Current User's Saved Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-tracks
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserSavedTracks = (limit: number): Promise<AxiosResponse<IUsersSavedTracks>> => {
  return UseAxios({ url: `/me/tracks?limit=${limit}` })
}

/**
 * Get Current User's followed artists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-artists-users
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserFollowedArtists = (limit: number): Promise<AxiosResponse<IUsersFollowedArtists>> => {
  return UseAxios({ url: `me/following?type=artist&limit=${limit}` })
}

/**
 * Get Playlist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
 * @param {string} playlistId - The Spotify ID for the playlist.
 * @returns {Promise}
 */
export const getPlaylistById = (playlistId: string | string[]): Promise<AxiosResponse<IPlaylist>> => {
  return UseAxios({ url: `/playlists/${playlistId}` })
}

/**
 * Get Album
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-album
 * @param {string} albumId - The Spotify ID for the album.
 * @returns {Promise}
 */
export const getAlbumById = (albumId: string | string[]): Promise<AxiosResponse<IAlbum>> => {
  return UseAxios({ url: `/albums/${albumId}` })
}

/**
 * Check If Current User Has Album Saved
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-albums
 * @param {string} albumId - The Spotify ID for the album.
 * @returns {Promise}
 */
export const getDoesUserHaveAlbumSaved = (albumId: string | string[]): Promise<AxiosResponse<boolean[]>> => {
  return UseAxios({ url: `/me/albums/contains?ids=${albumId}` })
}

/**
 * Save Albums for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/save-albums-user
 * @param {string} albumId - The Spotify ID for the album.
 * @returns {Promise}
 */
export const saveAlbumForCurrentUser = (albumId: string | string[]) => {
  return UseAxios({ url: `/me/albums?ids=${albumId}`, method: 'put' })
}

/**
 * Remove Albums for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-albums-user
 * @param {string} albumId - The Spotify ID for the album.
 * @returns {Promise}
 */
export const removeAlbumForCurrentUser = (albumId: string | string[]) => {
  return UseAxios({ url: `/me/albums?ids=${albumId}`, method: 'delete' })
}

/**
 * Check If Current User Has Track Saved
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-tracks
 * @param {string} trackIds - The Spotify ID for the track.
 * @returns {Promise}
 */
export const getDoesUserHaveTrackSaved = (trackIds: string | string[]): Promise<AxiosResponse<boolean[]>> => {
  return UseAxios({ url: `/me/tracks/contains?ids=${trackIds}` })
}

/**
 * Save Tracks for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/save-tracks-user
 * @param {string} trackIds - The Spotify ID for the track.
 * @returns {Promise}
 */
export const saveTrackForCurrentUser = (trackIds: string | string[]) => {
  return UseAxios({ url: `/me/tracks?ids=${trackIds}`, method: 'put' })
}

/**
 * Remove Tracks for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-tracks-user
 * @param {string} trackIds - The Spotify ID for the track.
 * @returns {Promise}
 */
export const removeTrackForCurrentUser = (trackIds: string | string[]): Promise<AxiosResponse<boolean>> => {
  return UseAxios({
    url: `/me/tracks?ids=${trackIds}`,
    method: 'delete',
  })
}

/**
 * Get Artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist
 * @param {string} artistId - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getArtistById = (artistId: string | string[]): Promise<AxiosResponse<IArtist>> => {
  return UseAxios({
    url: `/artists/${artistId}`,
  })
}

/**
 * Get Artist's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-top-tracks
 * @param {string} artistId - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getArtistTopTracks = (artistId: string | string[]): Promise<AxiosResponse<IArtistsTopTracks>> => {
  return UseAxios({
    url: `/artists/${artistId}/top-tracks?market=NL`,
  })
}

/**
 * Get Artist's Albums
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-albums
 * @param {string} artistId - The Spotify ID for the artist.
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getArtistAlbums = (artistId: string | string[], limit: number): Promise<AxiosResponse<IArtistsAlbums>> => {
  return UseAxios({
    url: `/artists/${artistId}/albums?market=NL&limit=${limit}`,
  })
}

/**
 * Get Artist's Related Artists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-related-artists
 * @param {string} artistId - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getArtistRelatedArtists = (artistId: string | string[]): Promise<AxiosResponse<IArtistsRelatedArtists>> => {
  return UseAxios({
    url: `/artists/${artistId}/related-artists`,
  })
}

/**
 * Check If Current User Follows Artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-current-user-follows
 * @param {string} artistId - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getDoesUserFollowArtist = (artistId: string | string[]): Promise<AxiosResponse<boolean[]>> => {
  return UseAxios({
    url: `/me/following/contains?type=artist&ids=${artistId}`,
  })
}

/**
 * Follow Artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-artists-users
 * @param {string} artistId - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const followArtistForCurrentUser = (artistId: string | string[]) => {
  return UseAxios({
    url: `/me/following?type=artist&ids=${artistId}`,
    method: 'put',
  })
}

/**
 * Unfollow Artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/unfollow-artists-users
 * @param {string} artistId - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const unfollowArtistForCurrentUser = (artistId: string | string[]) => {
  return UseAxios({
    url: `/me/following?type=artist&ids=${artistId}`,
    method: 'delete',
  })
}

/**
 * Get New Releases
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-new-releases
 * @returns {Promise}
 */
export const getNewReleases = (limit: number): Promise<AxiosResponse<INewReleases>> => {
  return UseAxios({ url: `/browse/new-releases?limit=${limit}` })
}

/**
 * Get Featured Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-featured-playlists
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getFeaturedPlaylists = (limit: number): Promise<AxiosResponse<IFeaturedPlaylists>> => {
  return UseAxios({ url: `/browse/featured-playlists?limit=${limit}` })
}

/**
 * Get Categories
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-new-releases
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCategories = (limit: number): Promise<AxiosResponse<ICategories>> => {
  return UseAxios({ url: `/browse/categories?limit=${limit}` })
}

/**
 * Get Category's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-new-releases
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCategoryPlaylists = (categoryId: string | string[], limit: number): Promise<AxiosResponse<ICategoryPlaylist>> => {
  return UseAxios({
    url: `/browse/categories/${categoryId}/playlists/?limit=${limit}`,
  })
}

/**
 * Return a comma separated string of track IDs from the given array of tracks
 */
const getTrackIds = (tracks: IPlaylistTracks['items']) => tracks.map(({ track }: IPlaylistItem) => track.id).join(',')

/**
 * Get Recommendations Based on Seeds
 * https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 * @param {IPlaylistTracks["items"]} tracks - The seeded tracks for the recommendations.
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getRecommendationsForTracks = (tracks: IPlaylistTracks['items'], limit: number): Promise<AxiosResponse<IRecommendations>> => {
  const shuffledTracks = tracks.sort(() => 0.5 - Math.random())
  const seedTracks = getTrackIds(shuffledTracks.slice(0, 5))
  const seedArtists = ''
  const seedGenres = ''

  return UseAxios({
    url: `https://api.spotify.com/v1/recommendations?seed_tracks=${seedTracks}&seed_artists=${seedArtists}&seed_genres=${seedGenres}&limit=${limit}`,
  })
}

/**
 * Search for Item
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 * @param {string} query - The search term
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getSearchItems = (query: string, limit: number): Promise<AxiosResponse<ISearchTracks>> => {
  return UseAxios({ url: `/search?q=${query}&type=track&limit=${limit}` })
}
