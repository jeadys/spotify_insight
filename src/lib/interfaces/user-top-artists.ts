export interface ExternalUrls {
  spotify: string
}

export interface Followers {
  href?: string
  total: number
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface Item {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface IUsersTopArtists {
  items: Item[]
  total?: number
  limit?: number
  offset?: number
  href?: string
  previous?: string
  next?: string
}
