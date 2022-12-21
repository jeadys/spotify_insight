import { Suspense } from 'react'

import SectionWrapper from '@/components/core/SectionWrapper'
import AlbumGrid from '@/components/grid/AlbumGrid'
import ArtistGrid from '@/components/grid/ArtistGrid'
import PlaylistGrid from '@/components/grid/PlaylistGrid'
import TrackGrid from '@/components/grid/TrackGrid'
import AlbumGridSkeleton from '@/components/skeleton/AlbumGridSkeleton'
import ArtistGridSkeleton from '@/components/skeleton/ArtistGridSkeleton'
import PlaylistGridSkeleton from '@/components/skeleton/PlaylistGridSkeleton'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import {
  getCurrentUserSavedTracks,
  getCurrentUserFollowedArtists,
  getCurrentUserSavedAlbums,
  getCurrentUserSavedPlaylists,
} from '@/server/api'

export default async function Library() {
  const savedPlaylists = await getCurrentUserSavedPlaylists(6)
  const savedAlbums = await getCurrentUserSavedAlbums(6)
  const savedTracks = await getCurrentUserSavedTracks(6)
  const followedArtists = await getCurrentUserFollowedArtists(6)
  const isTrackSaved: boolean[] = Array(50).fill(true)

  return (
    <>
      <Suspense fallback={<PlaylistGridSkeleton amount={6} />}>
        <SectionWrapper title="Saved playlists" seeAll="/library/saved-playlists">
          <PlaylistGrid playlists={savedPlaylists.items} />
        </SectionWrapper>
      </Suspense>

      <Suspense fallback={<AlbumGridSkeleton amount={6} />}>
        <SectionWrapper title="Saved albums" seeAll="/library/saved-albums">
          <AlbumGrid albums={savedAlbums.items.map(({ album }) => album)} />
        </SectionWrapper>
      </Suspense>

      <Suspense fallback={<TrackGridSkeleton amount={6} />}>
        <SectionWrapper title="Saved tracks" seeAll="/library/saved-tracks">
          <TrackGrid tracks={savedTracks.items.map(({ track }) => track)} isTrackSaved={isTrackSaved} />
        </SectionWrapper>
      </Suspense>

      <Suspense fallback={<ArtistGridSkeleton amount={6} />}>
        <SectionWrapper title="Followed artists" seeAll="/library/followed-artists">
          <ArtistGrid artists={followedArtists.artists.items} />
        </SectionWrapper>
      </Suspense>
    </>
  )
}
