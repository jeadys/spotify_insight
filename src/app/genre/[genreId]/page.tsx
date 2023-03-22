import Section from '@/components/layout/Section'
import ArtistList from '@/components/list/ArtistList'
import { getArtistBasedOnGenre } from '@/server/api'

export default async function Genre({ params }: { params: { genreId: string } }) {
  const genreArtists = await getArtistBasedOnGenre(params.genreId.replace(/%20/g, '-'), 50)

  // FIGURE OUT HOW TO GET ACCURATE ARTISTS BASED ON GENRE.

  return (
    <>
      {genreArtists.artists && (
        <>
          <Section title={decodeURIComponent(params.genreId)} description="Associated artists">
            <ArtistList
              artists={genreArtists.artists.items
                .filter((a) => a.genres.includes(decodeURIComponent(params.genreId)))
                .sort((a, b) => b.popularity - a.popularity)}
            />
          </Section>
        </>
      )}
    </>
  )
}
