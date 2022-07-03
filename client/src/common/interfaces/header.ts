export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href?: string;
  total: number;
}

export interface Image {
  height?: number;
  url: string;
  width?: number;
}

export interface Tracks {
  href?: string;
  total: number;
}

export interface Data {
  external_urls: ExternalUrls;
  followers?: Followers;
  genres?: string[];
  tracks?: Tracks;
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity?: number;
  type: string;
  uri: string;
}

export interface IHeader {
  data: Data;
}
