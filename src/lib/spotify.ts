import { Axios, AxiosResponse } from "axios";

import { useAxios } from "../hooks/useAxios";
import { generateRandomString } from "../lib/utils";
import { IAlbum } from "./interfaces/album";
import { IArtist } from "./interfaces/artist";
import { IArtistsAlbums } from "./interfaces/artist-album";
import { IArtistsRelatedArtists } from "./interfaces/artist-related-artists";
import { IArtistsTopTracks } from "./interfaces/artist-top-tracks";
import { ICategories } from "./interfaces/categories";
import { ICategoryPlaylist } from "./interfaces/category-playlist";
import { IFeaturedPlaylists } from "./interfaces/featured-playlists";
import { INewReleases } from "./interfaces/new-releases";
import { IPlaylist, IPlaylistItem, IPlaylistTracks } from "./interfaces/playlist";
import { IRecommendations } from "./interfaces/recommendations";
import { ISearchTrack } from "./interfaces/search-tracks";
import { IUser } from "./interfaces/user";
import { IUsersFollowedArtists } from "./interfaces/user-followed-artists";
import { IUsersSavedAlbums } from "./interfaces/user-saved-albums";
import { IUsersSavedPlaylists } from "./interfaces/user-saved-playlists";
import { IUsersSavedTracks } from "./interfaces/user-saved-tracks";
import { IUsersTopArtists } from "./interfaces/user-top-artists";
import { IUsersTopTracks } from "./interfaces/users-top-tracks";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID!;
const state = generateRandomString(16);
const scope =
  "user-read-private user-read-email user-top-read user-follow-read user-library-read user-read-playback-state user-modify-playback-state streaming user-follow-modify user-library-modify";

const queryParams = {
  client_id: CLIENT_ID,
  response_type: "code",
  state: state,
  scope: scope,
};

const queryParamString = new URLSearchParams(queryParams);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

export { LOGIN_URL };

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile
 * @returns {Promise}
 */
export const getCurrentUserProfile = (): Promise<AxiosResponse<IUser>> => {
  return useAxios({ url: "/me" });
};

/**
 * Get Current User's Top Artists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getTopArtists = (
  time_range: string,
  limit: number
): Promise<AxiosResponse<IUsersTopArtists>> => {
  return useAxios({
    url: `/me/top/artists?time_range=${time_range}&limit=${limit}`,
  });
};

/**
 * Get Current User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getTopTracks = (
  time_range: string,
  limit: number
): Promise<AxiosResponse<IUsersTopTracks>> => {
  return useAxios({
    url: `/me/top/tracks?time_range=${time_range}&limit=${limit}`,
  });
};

/**
 * Get Current User's Saved Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserSavedPlaylists = (
  limit: number
): Promise<AxiosResponse<IUsersSavedPlaylists>> => {
  return useAxios({ url: `/me/playlists?limit=${limit}` });
};

/**
 * Get Current User's Saved Albums
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-albums
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserSavedAlbums = (
  limit: number
): Promise<AxiosResponse<IUsersSavedAlbums>> => {
  return useAxios({ url: `/me/albums?limit=${limit}` });
};

/**
 * Get Current User's Saved Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-tracks
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserSavedTracks = (
  limit: number
): Promise<AxiosResponse<IUsersSavedTracks>> => {
  return useAxios({ url: `/me/tracks?limit=${limit}` });
};

/**
 * Get Current User's followed artists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-artists-users
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCurrentUserFollowedArtists = (
  limit: number
): Promise<AxiosResponse<IUsersFollowedArtists>> => {
  return useAxios({ url: `me/following?type=artist&limit=${limit}` });
};

/**
 * Get Playlist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
 * @param {string} playlist_id - The Spotify ID for the playlist.
 * @returns {Promise}
 */
export const getPlaylistById = (
  playlist_id: string | string[]
): Promise<AxiosResponse<IPlaylist>> => {
  return useAxios({ url: `/playlists/${playlist_id}` });
};

/**
 * Get Album
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-album
 * @param {string} album_id - The Spotify ID for the album.
 * @returns {Promise}
 */
export const getAlbumById = (album_id: string | string[]): Promise<AxiosResponse<IAlbum>> => {
  return useAxios({ url: `/albums/${album_id}` });
};

/**
 * Check If Current User Has Album Saved
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-albums
 * @param {string} album_id - The Spotify ID for the album.
 * @returns {Promise}
 */
export const getDoesUserHaveAlbumSaved = (
  album_id: string | string[]
): Promise<AxiosResponse<boolean[]>> => {
  return useAxios({ url: `/me/albums/contains?ids=${album_id}` });
};

/**
 * Save Albums for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/save-albums-user
 * @param {string} album_id - The Spotify ID for the album.
 * @returns {Promise}
 */
export const saveAlbumForCurrentUser = (album_id: string | string[]) => {
  return useAxios({ url: `/me/albums?ids=${album_id}`, method: "put" });
};

/**
 * Remove Albums for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-albums-user
 * @param {string} album_id - The Spotify ID for the album.
 * @returns {Promise}
 */
export const removeAlbumForCurrentUser = (album_id: string | string[]) => {
  return useAxios({ url: `/me/albums?ids=${album_id}`, method: "delete" });
};

/**
 * Check If Current User Has Track Saved
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-tracks
 * @param {string} track_ids - The Spotify ID for the track.
 * @returns {Promise}
 */
export const getDoesUserHaveTrackSaved = (
  track_ids: string | string[]
): Promise<AxiosResponse<boolean[]>> => {
  return useAxios({ url: `/me/tracks/contains?ids=${track_ids}` });
};

/**
 * Save Tracks for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/save-tracks-user
 * @param {string} track_ids - The Spotify ID for the track.
 * @returns {Promise}
 */
export const saveTrackForCurrentUser = (track_ids: string | string[]) => {
  return useAxios({ url: `/me/tracks?ids=${track_ids}`, method: "put" });
};

/**
 * Remove Tracks for Current User
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-tracks-user
 * @param {string} track_ids - The Spotify ID for the track.
 * @returns {Promise}
 */
export const removeTrackForCurrentUser = (
  track_ids: string | string[]
): Promise<AxiosResponse<boolean>> => {
  return useAxios({
    url: `/me/tracks?ids=${track_ids}`,
    method: "delete",
  });
};

/**
 * Get Artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist
 * @param {string} artist_id - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getArtistById = (artist_id: string | string[]): Promise<AxiosResponse<IArtist>> => {
  return useAxios({
    url: `/artists/${artist_id}`,
  });
};

/**
 * Get Artist's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-top-tracks
 * @param {string} artist_id - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getArtistTopTracks = (
  artist_id: string | string[]
): Promise<AxiosResponse<IArtistsTopTracks>> => {
  return useAxios({
    url: `/artists/${artist_id}/top-tracks?market=NL`,
  });
};

/**
 * Get Artist's Albums
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-albums
 * @param {string} artist_id - The Spotify ID for the artist.
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getArtistAlbums = (
  artist_id: string | string[],
  limit: number
): Promise<AxiosResponse<IArtistsAlbums>> => {
  return useAxios({
    url: `/artists/${artist_id}/albums?market=NL&limit=${limit}`,
  });
};

/**
 * Get Artist's Related Artists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artists-related-artists
 * @param {string} artist_id - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getArtistRelatedArtists = (
  artist_id: string | string[]
): Promise<AxiosResponse<IArtistsRelatedArtists>> => {
  return useAxios({
    url: `/artists/${artist_id}/related-artists`,
  });
};

/**
 * Check If Current User Follows Artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-current-user-follows
 * @param {string} artist_id - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const getDoesUserFollowArtist = (
  artist_id: string | string[]
): Promise<AxiosResponse<boolean[]>> => {
  return useAxios({
    url: `/me/following/contains?type=artist&ids=${artist_id}`,
  });
};

/**
 * Follow Artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-artists-users
 * @param {string} artist_id - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const followArtistForCurrentUser = (artist_id: string | string[]) => {
  return useAxios({
    url: `/me/following?type=artist&ids=${artist_id}`,
    method: "put",
  });
};

/**
 * Unfollow Artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/unfollow-artists-users
 * @param {string} artist_id - The Spotify ID for the artist.
 * @returns {Promise}
 */
export const unfollowArtistForCurrentUser = (artist_id: string | string[]) => {
  return useAxios({
    url: `/me/following?type=artist&ids=${artist_id}`,
    method: "delete",
  });
};

/**
 * Get New Releases
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-new-releases
 * @returns {Promise}
 */
export const getNewReleases = (limit: number): Promise<AxiosResponse<INewReleases>> => {
  return useAxios({ url: `/browse/new-releases?limit=${limit}` });
};

/**
 * Get Featured Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-featured-playlists
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getFeaturedPlaylists = (limit: number): Promise<AxiosResponse<IFeaturedPlaylists>> => {
  return useAxios({ url: `/browse/featured-playlists?limit=${limit}` });
};

/**
 * Get Categories
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-new-releases
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCategories = (limit: number): Promise<AxiosResponse<ICategories>> => {
  return useAxios({ url: `/browse/categories?limit=${limit}` });
};

/**
 * Get Category's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-new-releases
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getCategoryPlaylists = (
  category_id: string | string[],
  limit: number
): Promise<AxiosResponse<ICategoryPlaylist>> => {
  return useAxios({
    url: `/browse/categories/${category_id}/playlists/?limit=${limit}`,
  });
};

/**
 * Return a comma separated string of track IDs from the given array of tracks
 */
const getTrackIds = (tracks: IPlaylistTracks["items"]) =>
  tracks.map(({ track }: IPlaylistItem) => track.id).join(",");

/**
 * Get Recommendations Based on Seeds
 * https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 * @param {IPlaylistTracks["items"]} tracks - The seeded tracks for the recommendations.
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const getRecommendationsForTracks = (
  tracks: IPlaylistTracks["items"],
  limit: number
): Promise<AxiosResponse<IRecommendations>> => {
  const shuffledTracks = tracks.sort(() => 0.5 - Math.random());
  const seed_tracks = getTrackIds(shuffledTracks.slice(0, 5));
  const seed_artists = "";
  const seed_genres = "";

  return useAxios({
    url: `https://api.spotify.com/v1/recommendations?seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}&limit=${limit}`,
  });
};

/**
 * Search for Item
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/search
 * @param {string} query - The search term
 * @param {number} limit - Total amount of items to return
 * @returns {Promise}
 */
export const searchItems = (query: string, limit: number): Promise<AxiosResponse<ISearchTrack>> => {
  return useAxios({ url: `/search?q=${query}&type=track&limit=${limit}` });
};
