import GenreList from '@/components/list/GenreList'
import { getTopArtists } from '@/server/api'

export default async function TopGenre() {
  const topArtists = await getTopArtists('short_term', 50)
  const topGenres = topArtists.items.map((artist) => artist.genres).flat()
  const uniqueTopGenres = Array.from(new Set(topGenres)).slice(0, 6)

  return <GenreList genres={uniqueTopGenres} />
}
