import axios from "axios";
import { IAlbum } from "./common/interfaces/album";
import { IArtist } from "./common/interfaces/artist";
import { IArtistsAlbums } from "./common/interfaces/artistsAlbums";
import { IArtistsRelatedArtists } from "./common/interfaces/artistsRelatedArtists";
import { IArtistsTopTracks } from "./common/interfaces/artistsTopTracks";
import { ICategories } from "./common/interfaces/categories";
import { IFeaturedPlaylists } from "./common/interfaces/featuredPlaylists";
import { INewReleases } from "./common/interfaces/newReleases";
import { IPlaylist } from "./common/interfaces/playlist";
import { ISearchTrack } from "./common/interfaces/searchTrack";
import { IUsersFollowedArtists } from "./common/interfaces/usersFollowedArtists";
import { IUsersPlaylists } from "./common/interfaces/usersPlaylists";
import { IUsersSavedAlbums } from "./common/interfaces/usersSavedAlbums";
import { IUsersSavedTracks } from "./common/interfaces/usersSavedTracks";
import { IUsersTopArtists } from "./common/interfaces/usersTopArtists";
import { IUsersTopTracks } from "./common/interfaces/usersTopTracks";

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(
      LOCALSTORAGE_KEYS[property as keyof typeof LOCALSTORAGE_KEYS]
    );
  }
  // Navigate to homepage
  window.location.href = window.location.origin;
};

/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return millisecondsElapsed / 1000 > Number(expireTime);
};

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
const refreshToken = async () => {
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.error("No refresh token available");
      logout();
    }

    // Use `/refresh_token` endpoint from our Node app
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    );

    // Update localStorage values
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.timestamp,
      Date.now().toString()
    );

    // Reload the page for localStorage updates to be reflected
    window.location.reload();
  } catch (e) {
    console.error(e);
  }
};

/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = (): string | undefined => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
  };
  const hasError = urlParams.get("error");

  // If there's an error OR the token in localStorage has expired, refresh the token
  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    refreshToken();
  }

  // If there is a valid access token in localStorage, use that
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there is a token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]!); // TODO: IS ! CORRECT?
    }
    // Set timestamp
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.timestamp,
      Date.now().toString()
    );
    // Return access token from query params
    return queryParams[LOCALSTORAGE_KEYS.accessToken]!; // TODO: IS ! CORRECT
  }

  // We should never get here!
  return undefined;
};

export const accessToken = getAccessToken();

/**
 * Axios global request headers
 * https://github.com/axios/axios#global-axios-defaults
 */
axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers.common["Content-Type"] = "application/json";

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = () => axios.get("/me");

/**
 * Get a User's Top Artists and Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @returns {Promise}
 */
export const getTopArtists = (time_range: string, limit = 30) => {
  return axios.get<IUsersTopArtists>(
    `/me/top/artists?time_range=${time_range}&limit=${limit}`
  );
};

export const getTopTracks = (time_range: string, limit = 30) => {
  return axios.get<IUsersTopTracks>(
    `/me/top/tracks?time_range=${time_range}&limit=${limit}`
  );
};

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
 * @returns {Promise}
 */
export const getCurrentUserPlaylists = (limit = 20) => {
  return axios.get<IUsersPlaylists>(`/me/playlists?limit=${limit}`);
};

/**
 * Get a List of Current User's saved tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-tracks
 * @returns {Promise}
 */
export const getCurrentUserSavedTracks = (limit = 50) => {
  return axios.get<IUsersSavedTracks>(`/me/tracks?limit=${limit}`);
};

/**
 * Get a List of Current User's saved albums
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-albums
 * @returns {Promise}
 */
export const getCurrentUserSavedAlbums = (limit = 50) => {
  return axios.get<IUsersSavedAlbums>(`/me/albums?limit=${limit}`);
};

/**
 * Check Saved Albums for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-albums
 * @param {string[]} track_ids - The Spotify ID for the track.
 * @returns {Promise}
 */
export const getDoesUserHaveAlbumSaved = (album_ids: string[]) => {
  return axios.get(`/me/albums/contains?ids=${album_ids}`);
};

/**
 * Save Albums for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/save-albums-user
 * @param {string} album_ids - The Spotify ID for the album.
 * @returns {Promise}
 */
export const saveAlbumForCurrentUser = (album_ids: string) => {
  return axios.put(`/me/albums?ids=${album_ids}`);
};

/**
 * Remove Albums for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-albums-user
 * @param {string} album_ids - The Spotify ID for the album.
 * @returns {Promise}
 */
export const removeAlbumForCurrentUser = (album_ids: string) => {
  return axios.delete(`/me/albums?ids=${album_ids}`);
};

/**
 * Get a List of Current User's followed artists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-artists-users
 * @returns {Promise}
 */
export const getCurrentUserFollowedArtists = (limit = 50) => {
  return axios.get<IUsersFollowedArtists>(
    `me/following?type=artist&limit=${limit}`
  );
};

/**
 * Check Saved Tracks for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-tracks
 * @param {string[]} track_ids - The Spotify ID for the track.
 * @returns {Promise}
 */
export const getDoesUserHaveTrackSaved = (track_ids: string[]) => {
  return axios.get(`/me/tracks/contains?ids=${track_ids}`);
};

/**
 * Save Tracks for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/save-tracks-user
 * @param {string} track_ids - The Spotify ID for the track.
 * @returns {Promise}
 */
export const saveTrackForCurrentUser = (track_ids: string) => {
  return axios.put(`/me/tracks?ids=${track_ids}`);
};

/**
 * Remove Tracks for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-tracks-user
 * @param {string} track_ids - The Spotify ID for the track.
 * @returns {Promise}
 */
export const removeTrackForCurrentUser = (track_ids: string) => {
  return axios.delete(`/me/tracks?ids=${track_ids}`);
};

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlist
 * @param {string} playlist_id - The Spotify ID for the playlist.
 * @returns {Promise}
 */
export const getPlaylistById = (playlist_id: string) => {
  return axios.get<IPlaylist>(`/playlists/${playlist_id}`);
};

/**
 * Get an Artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist
 * @param {string} artist_id - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getArtistById = (artist_id: string) => {
  return axios.get<IArtist>(`/artists/${artist_id}`);
};

/**
 * Get an Artist's Top tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-top-tracks
 * @param {string} artist_id - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getArtistTopTracks = (artist_id: string, limit = 10) => {
  return axios.get<IArtistsTopTracks>(
    `/artists/${artist_id}/top-tracks?market=NL&limit=${limit}`
  );
};

/**
 * Get a List of Current Artist's Albums
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-albums
 * @param {string} artist_id - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getArtistAlbums = (artist_id: string, limit = 10) => {
  return axios.get<IArtistsAlbums>(
    `/artists/${artist_id}/albums?market=NL&limit=${limit}`
  );
};

export const getArtistRelatedArtists = (artist_id: string) => {
  return axios.get<IArtistsRelatedArtists>(
    `/artists/${artist_id}/related-artists`
  );
};

/**
 * Get an Album
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-album
 * @param {string} album_id - The Spotify ID for the album.
 * @returns {Promise}
 */
export const getAlbumById = (album_id: string) => {
  return axios.get<IAlbum>(`/albums/${album_id}`);
};

/**
 * Search for Item
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 * @param {string} query - The search term
 * @returns {Promise}
 */
export const searchItems = (query: string, limit = 30) => {
  return axios.get<ISearchTrack>(
    `/search?q=${query}&type=track&limit=${limit}`
  );
};

/**
 * Check If User Follows Artists or Users
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-current-user-follows
 * @param {string[]} artist_ids - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getDoesUserFollowArtist = (artist_ids: string[]) => {
  return axios.get(`/me/following/contains?type=artist&ids=${artist_ids}`);
};

/**
 * Follow Artists or Users
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-artists-users
 * @param {string} artist_ids - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const followArtist = (artist_ids: string) => {
  return axios.put(`/me/following?type=artist&ids=${artist_ids}`);
};

/**
 * Unfollow Artists or Users
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/unfollow-artists-users
 * @param {string} artist_ids - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const unfollowArtist = (artist_ids: string) => {
  return axios.delete(`/me/following?type=artist&ids=${artist_ids}`);
};

export const getNewReleases = (limit = 50) => {
  return axios.get<INewReleases>(`/browse/new-releases?limit=${limit}`);
};

export const getCategories = (limit = 50) => {
  return axios.get<ICategories>(`/browse/categories?limit=${limit}`);
};

export const getCategoryById = (category_id: string) => {
  return axios.get<ICategories>(`browse/categories/${category_id}`);
};

export const getCategoryPlaylists = (category_id: string, limit = 50) => {
  return axios.get(
    `/browse/categories/${category_id}/playlists/?limit=${limit}`
  );
};

export const getFeaturedPlaylists = (limit = 50) => {
  return axios.get<IFeaturedPlaylists>(
    `/browse/featured-playlists?limit=${limit}`
  );
};
