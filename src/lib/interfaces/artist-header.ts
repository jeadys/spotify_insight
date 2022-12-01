export interface ExternalUrls {
  spotify: string
}

export interface Owner {
  display_name: string
  href: string
  id: string
  type: string
  uri: string
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

export interface Data {
  external_urls: ExternalUrls
  followers?: Followers
  genres?: string[]
  href: string
  id: string
  images: Image[]
  owner?: Owner
  name: string
  popularity?: number
  type: string
  uri: string
}

export interface IArtistHeader {
  data: Data
}
