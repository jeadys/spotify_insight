import SectionWrapper from '@/components/core/SectionWrapper'
import TrackGrid from '@/components/grid/TrackGrid'
import PlaylistHeader from '@/components/header/PlaylistHeader'
import PlaylistHeaderSkeleton from '@/components/skeleton/PlaylistHeaderSkeleton'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import { getDoesUserHaveTrackSaved, getPlaylistById } from '@/server/api'

type PlaylistAccumulator = {
  tracks: SpotifyApi.TrackObjectFull[]
  trackIds: string[]
}

export default async function Playlist({ params }: { params: { playlistId: string } }) {
  const playlist = await getPlaylistById(params.playlistId)

  const playlistTracks = playlist.tracks.items.slice(0, 50).reduce<PlaylistAccumulator>(
    (accumulator, { track }) => {
      accumulator.tracks.push(track)
      accumulator.trackIds.push(track.id)
      return accumulator
    },
    { tracks: [], trackIds: [] }
  )
  const isTrackSaved = await getDoesUserHaveTrackSaved(playlistTracks.trackIds.join(','))

  return (
    <>
      {playlist ? (
        <>
          <div className="flex flex-wrap lg:space-x-10">
            <div className="basis-full text-center xl:sticky xl:top-0 xl:basis-1/4 xl:self-start">
              <PlaylistHeader playlist={playlist} />
            </div>
            <div className="flex-grow">
              <SectionWrapper title="Playlist tracks">
                <TrackGrid tracks={playlistTracks.tracks} isTrackSaved={isTrackSaved} />
              </SectionWrapper>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap lg:space-x-10">
            <div className="basis-full text-center xl:sticky xl:top-0 xl:basis-1/4 xl:self-start">
              <PlaylistHeaderSkeleton />
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
