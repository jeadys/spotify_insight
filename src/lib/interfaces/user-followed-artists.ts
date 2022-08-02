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

export interface Item {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Cursors {
  after: string;
}

export interface Artists {
  items: Item[];
  next: string;
  total: number;
  cursors: Cursors;
  limit: number;
  href: string;
}

export interface IUsersFollowedArtists {
  artists: Artists;
}
