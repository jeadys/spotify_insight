import SectionWrapper from '@/components/core/SectionWrapper'
import AlbumGrid from '@/components/grid/AlbumGrid'
import ArtistGrid from '@/components/grid/ArtistGrid'
import TrackGrid from '@/components/grid/TrackGrid'
import ArtistHeader from '@/components/header/ArtistHeader'
import AlbumGridSkeleton from '@/components/skeleton/AlbumGridSkeleton'
import ArtistGridSkeleton from '@/components/skeleton/ArtistGridSkeleton'
import ArtistHeaderSkeleton from '@/components/skeleton/ArtistHeaderSkeleton'
import TrackGridSkeleton from '@/components/skeleton/TrackGridSkeleton'
import {
  getArtistAlbums,
  getArtistById,
  getArtistRelatedArtists,
  getArtistTopTracks,
  getDoesUserFollowArtist,
  getDoesUserHaveTrackSaved,
} from '@/server/api'

export default async function Artist({ params }: { params: { artistId: string } }) {
  const artist = await getArtistById(params.artistId)
  const artistTopTracks = await getArtistTopTracks(params.artistId)
  const artistAlbums = await getArtistAlbums(params.artistId, 6)
  const artistRelatedArtists = await getArtistRelatedArtists(params.artistId)
  const isArtistFollowed = await getDoesUserFollowArtist(params.artistId)
  const isTrackSaved = await getDoesUserHaveTrackSaved(artistTopTracks.tracks.map((track) => track.id).join(','))

  return (
    <>
      {artist && artistTopTracks && artistAlbums && artistRelatedArtists ? (
        <>
          <ArtistHeader artist={artist} isArtistFollowed={isArtistFollowed[0]} />
          <SectionWrapper title="Popular releases">
            <TrackGrid tracks={artistTopTracks.tracks} isTrackSaved={isTrackSaved} />
          </SectionWrapper>

          <SectionWrapper title="Popular albums" seeAll={`/artists/${params.artistId}/related-albums`}>
            <AlbumGrid albums={artistAlbums.items} />
          </SectionWrapper>

          <SectionWrapper title="Fans also like" seeAll={`/artists/${params.artistId}/related-artists`}>
            <ArtistGrid artists={artistRelatedArtists.artists.slice(0, 6)} />
          </SectionWrapper>
        </>
      ) : (
        <>
          <ArtistHeaderSkeleton />
          <TrackGridSkeleton amount={12} />
          <AlbumGridSkeleton amount={6} />
          <ArtistGridSkeleton amount={6} />
        </>
      )}
    </>
  )
}
