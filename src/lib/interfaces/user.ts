export interface ExternalUrls {
  spotify: string
}

export interface Followers {
  href?: any
  total: number
}

export interface Image {
  height?: any
  url: string
  width?: any
}

export interface IUser {
  display_name: string
  external_urls: ExternalUrls
  followers: Followers
  href: string
  id: string
  images: Image[]
  type: string
  uri: string
}
