export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href?: string;
  total: number;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Owner {
  display_name: string;
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface ExternalUrls3 {
  spotify: string;
}

export interface AddedBy {
  external_urls: ExternalUrls3;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface ExternalUrls4 {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrls4;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls5 {
  spotify: string;
}

export interface Image2 {
  height: number;
  url: string;
  width: number;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  external_urls: ExternalUrls5;
  href: string;
  id: string;
  images: Image2[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ExternalUrls6 {
  spotify: string;
}

export interface Artist2 {
  external_urls: ExternalUrls6;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalIds {
  isrc: string;
}

export interface ExternalUrls7 {
  spotify: string;
}

export interface ExternalUrls8 {
  spotify: string;
}

export interface LinkedFrom {
  external_urls: ExternalUrls8;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface Track {
  album: Album;
  artists: Artist2[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls7;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
  linked_from: LinkedFrom;
}

export interface VideoThumbnail {
  url?: string;
}

export interface Item {
  added_at: Date;
  added_by: AddedBy;
  primary_color?: string;
  track: Track;
  video_thumbnail: VideoThumbnail;
  album: Album;
  artists: Artist2[];
  // available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls4;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface Tracks {
  items: Item[];
  href?: string;
  limit?: number;
  next?: string;
  offset?: number;
  previous?: string;
  total: number;
}

export interface IPlaylist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  primary_color?: string;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}
