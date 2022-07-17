export interface ExternalUrls {
  spotify: string;
}

export interface Owner {
  display_name: string;
  href: string;
  id: string;
  type: string;
  uri: string;
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

export interface Track {
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
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
}

export interface Item {
  added_at?: Date;
  primary_color?: string;
  track?: Track;
  // available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
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
  total: number;
}

export interface Data {
  external_urls: ExternalUrls;
  followers?: Followers;
  genres?: string[];
  tracks: Tracks;
  href: string;
  id: string;
  images: Image[];
  owner?: Owner;
  name: string;
  release_date?: string;
  popularity?: number;
  type: string;
  uri: string;
}

export interface ITrackHeader {
  data: Data;
}
