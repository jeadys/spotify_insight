import Link from 'next/link'

type Props = {
  artistGenre: string
}

export default function ArtistGenre({ artistGenre }: Props) {
  return (
    <>
      {artistGenre ? (
        <Link href={`/genre/${artistGenre}`} className="max-w-max text-gray-400 line-clamp-1 hover:underline">
          {artistGenre}
        </Link>
      ) : (
        <h4 className="text-gray-400">N/A</h4>
      )}
    </>
  )
}
