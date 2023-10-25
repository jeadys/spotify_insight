import { GeneratorSearchItem } from '@/components/generator/GeneratorSearchItem'
import { getSearchSeeds } from '@/server/api'

type Props = {
  searchParams: string
}

export const GeneratorSearchList = async ({ searchParams }: Props) => {
  if (!searchParams) return

  const data = await getSearchSeeds(searchParams, 3)

  return (
    <>
      <div className="flex flex-col">
        {data?.artists?.items && (
          <>
            <p className="mt-5 font-medium text-white">Artists</p>
            <ul>
              {data?.artists?.items.map((artist) => (
                <GeneratorSearchItem
                  key={artist.id}
                  seedType="artist"
                  id={artist.id}
                  name={artist.name}
                  description={artist.genres[0]}
                  image={artist.images?.[2]?.url}
                />
              ))}
            </ul>
          </>
        )}

        {data?.tracks?.items && (
          <>
            <p className="font-medium text-white">Tracks</p>
            <ul>
              {data?.tracks?.items.map((track) => (
                <GeneratorSearchItem
                  key={track.id}
                  seedType="track"
                  id={track.id}
                  name={track.name}
                  description={track.artists[0].name}
                  image={track.album.images?.[2]?.url}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}
