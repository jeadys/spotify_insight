import { Suspense } from 'react'

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
    <div className="flex flex-wrap lg:space-x-10">
      <div className="basis-full text-center xl:sticky xl:top-0 xl:basis-1/4 xl:self-start">
        <Suspense fallback={<AlbumHeaderSkeleton />}>
          <AlbumHeader album={album} isAlbumSaved={isAlbumSaved[0]} />
        </Suspense>
      </div>
      <div className="flex-grow">
        <Suspense fallback={<TrackGridSkeleton amount={50} />}>
          <SectionWrapper title="Album tracks">
            <TrackGrid tracks={albumTracks.tracks} isTrackSaved={isTrackSaved} />
          </SectionWrapper>
        </Suspense>
      </div>
    </div>
  )
}
