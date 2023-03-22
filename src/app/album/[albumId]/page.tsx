import AlbumHeader from '@/components/header/AlbumHeader'
import Section from '@/components/layout/Section'
import TrackList from '@/components/list/TrackList'
import { getAlbumById } from '@/server/api'

type AlbumAccumulator = {
  tracks: SpotifyApi.TrackObjectSimplified[]
  trackIds: string[]
}

export default async function Album({ params }: { params: { albumId: string } }) {
  const album = await getAlbumById(params.albumId)

  const albumTracks = album?.tracks.items.slice(0, 50).reduce<AlbumAccumulator>(
    (accumulator, track) => {
      accumulator.tracks.push(track)
      accumulator.trackIds.push(track.id)
      return accumulator
    },
    { tracks: [], trackIds: [] }
  )

  return (
    <>
      <AlbumHeader album={album} />

      <Section title="Tracks" description={`Album tracks of ${album.name}`}>
        <TrackList tracks={albumTracks.tracks} cover={album.images?.[2]?.url} />
      </Section>

      <Section title="Copyrights" description={`${album.name} released by ${album.label}`}>
        <div className="text-sm text-gray-300">
          {album.copyrights.map((copyright) => (
            <div key={copyright.text + copyright.type}>
              {copyright.text} {copyright.type}
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
