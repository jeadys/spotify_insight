/**
 * This file is meant to overwrite or add some extra types to the spotify-api definitelytyped
 */

declare namespace SpotifyApi {
  interface TrackObjectSimplified {
    album: AlbumObjectSimplified
    external_ids: ExternalIdObject
    popularity: number
    is_local?: boolean | undefined
  }

  interface PlaylistTrackObject {
    track: TrackObjectFull
  }

  interface RecommendationAlbumObject {
    album_type: 'album' | 'single' | 'compilation'
  }
}
