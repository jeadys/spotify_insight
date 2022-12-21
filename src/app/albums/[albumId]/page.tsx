import SectionWrapper from '@/components/core/SectionWrapper'
import TrackGrid from '@/components/grid/TrackGrid'
import AlbumHeader from '@/components/header/AlbumHeader'
import AlbumHeaderSkeleton from '@/components/skeleton/AlbumHeaderSkeleton'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import { getAlbumById, getDoesUserHaveAlbumSaved, getDoesUserHaveTrackSaved } from '@/server/api'

type AlbumAccumulator = {
  tracks: SpotifyApi.TrackObjectSimplified[]
  trackIds: string[]
}

export default async function Album({ params }: { params: { albumId: string } }) {
  const album = await getAlbumById(params.albumId)
  const isAlbumSaved = await getDoesUserHaveAlbumSaved(params.albumId)

  const albumTracks = album.tracks.items.slice(0, 50).reduce<AlbumAccumulator>(
    (accumulator, track) => {
      accumulator.tracks.push(track)
      accumulator.trackIds.push(track.id)
      return accumulator
    },
    { tracks: [], trackIds: [] }
  )
  const isTrackSaved = await getDoesUserHaveTrackSaved(albumTracks.trackIds.join(','))

  return (
    <>
      {album ? (
        <>
          <div className="flex flex-wrap lg:space-x-10">
            <div className="basis-full text-center xl:sticky xl:top-0 xl:basis-1/4 xl:self-start">
              <AlbumHeader album={album} isAlbumSaved={isAlbumSaved[0]} />
            </div>
            <div className="flex-grow">
              <SectionWrapper title="Album tracks">
                <TrackGrid tracks={albumTracks.tracks} isTrackSaved={isTrackSaved} />
              </SectionWrapper>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap lg:space-x-10">
            <div className="basis-full text-center xl:sticky xl:top-0 xl:basis-1/4 xl:self-start">
              <AlbumHeaderSkeleton />
            </div>
            <div className="flex-grow">
              <TrackGridSkeleton amount={50} />
            </div>
          </div>
        </>
      )}
    </>
  )
}
