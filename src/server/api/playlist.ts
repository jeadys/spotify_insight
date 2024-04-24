'use server'

import { revalidatePath } from 'next/cache'
import { fetchWrapper } from '@/server/useFetchWrapper'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/[...nextauth]'

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
 * Get a playlist's tracks
 *
 * GET /v1/users/{user_id}/playlists/{playlist_id}/tracks
 * https://developer.spotify.com/web-api/get-playlists-tracks/
 * @param {string} playlistId The Spotify ID for the playlist
 * @returns {Promise}
 */
export const getPlaylistTracks = async (playlistId: string, limit: number): Promise<SpotifyApi.PlaylistTrackResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}`, method: 'GET' })
}

type getRecommendationsBasedOnSeedsProps = {
  seedArtists: string[]
  seedTracks: string[]
  targetAcousticness: number
  targetDanceability: number
  targetEnergy: number
  targetInstrumentalness: number
  targetPopularity: number
  targetValence: number
  limit: number
}

/**
 * Get recommendations based on seeds
 *
 * GET /v1/recommendations
 * https://developer.spotify.com/get-recommendations/
 * @param {object} getRecommendationsBasedOnSeedsProps Object
 * @returns {Promise}
 */
export const getRecommendationsBasedOnSeeds = async ({
  seedArtists,
  seedTracks,
  targetAcousticness,
  targetDanceability,
  targetEnergy,
  targetInstrumentalness,
  targetPopularity,
  targetValence,
  limit,
}: getRecommendationsBasedOnSeedsProps): Promise<SpotifyApi.RecommendationsFromSeedsResponse> => {
  return fetchWrapper({
    url: `https://api.spotify.com/v1/recommendations?\
seed_artists=${seedArtists}&\
seed_tracks=${seedTracks}&\
target_acousticness=${targetAcousticness}&\
target_danceability=${targetDanceability}&\
target_energy=${targetEnergy}&\
target_instrumentalness=${targetInstrumentalness}&\
target_popularity=${targetPopularity}&\
target_valence=${targetValence}&\
limit=${limit}`,
    method: 'GET',
  })
}

/**
 * Create a Playlist
 *
 * POST /v1/users/{user_id}/playlists
 * https://developer.spotify.com/web-api/create-playlist/
 */
export const createPlaylist = async (
  userId?: string,
  name?: string,
  description?: string,
  publicPlaylist?: boolean
): Promise<SpotifyApi.CreatePlaylistResponse> => {
  return fetchWrapper({
    url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    method: 'POST',
    body: {
      'name': name,
      'description': description,
      'public': publicPlaylist,
    },
  })
}

/**
 * Add Tracks to a Playlist
 *
 * POST /v1/users/{user_id}/playlists/{playlist_id}/tracks
 * https://developer.spotify.com/web-api/add-tracks-to-playlist/
 */
export const addTracksToPlaylist = async (
  playlistId: string,
  trackUris: string[] | undefined
): Promise<SpotifyApi.AddTracksToPlaylistResponse> => {
  return fetchWrapper({ url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUris}`, method: 'POST' })
}

/**
 * Create playlist based on seeds
 *
 * GET /v1/recommendations
 * https://developer.spotify.com/get-recommendations/
 *
 * POST /v1/users/{user_id}/playlists/{playlist_id}/tracks
 * https://developer.spotify.com/web-api/add-tracks-to-playlist/
 *
 * POST /v1/users/{user_id}/playlists
 * https://developer.spotify.com/web-api/create-playlist/
 */
export const createPlaylistBasedOnSeeds = async (data: getRecommendationsBasedOnSeedsProps, isPublic: boolean) => {
  if (!data.seedArtists.length && !data.seedTracks.length) return

  const session = await getServerSession(authOptions)
  const recommendations = await getRecommendationsBasedOnSeeds(data)

  if (recommendations.tracks) {
    const create = await createPlaylist(
      session?.user.id,
      'Discover Anytime',
      'Created at https://spotify-insight-jeadys.vercel.app',
      isPublic
    )
    if (create) {
      const add = await addTracksToPlaylist(
        create.id,
        recommendations.tracks.map((track) => track.uri)
      )
      if (add) {
        revalidatePath('/generator')
      }
    }
  }
}
