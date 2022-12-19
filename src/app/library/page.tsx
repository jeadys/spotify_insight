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

  return (
    <>
      {savedPlaylists && savedAlbums && savedTracks && followedArtists ? (
        <>
          <SectionWrapper title="Saved playlists" seeAll="/library/saved-playlists">
            <PlaylistGrid playlists={savedPlaylists.items} />
          </SectionWrapper>

          <SectionWrapper title="Saved albums" seeAll="/library/saved-albums">
            <AlbumGrid albums={savedAlbums.items.map(({ album }) => album)} />
          </SectionWrapper>

          <SectionWrapper title="Saved tracks" seeAll="/library/saved-tracks">
            <TrackGrid tracks={savedTracks.items.map(({ track }) => track)} isTrackSaved={savedTracks.items.map(() => true)} />
          </SectionWrapper>

          <SectionWrapper title="Followed artists" seeAll="/library/followed-artists">
            <ArtistGrid artists={followedArtists.artists.items} />
          </SectionWrapper>
        </>
      ) : (
        <>
          <PlaylistGridSkeleton amount={6} />
          <AlbumGridSkeleton amount={6} />
          <TrackGridSkeleton amount={6} />
          <ArtistGridSkeleton amount={6} />
        </>
      )}
    </>
  )
}
