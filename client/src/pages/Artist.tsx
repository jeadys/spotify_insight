import {
  getArtistById,
  getArtistTopTracks,
  getArtistAlbums,
  getArtistRelatedArtists,
} from "../spotify";
import { AlbumGrid, TrackGrid, ArtistGrid } from "../components/grid";
import { SectionWrapper, Header } from "../components";
import { useParams } from "react-router-dom";
import { IArtist } from "../common/interfaces/artist";
import { IArtistsAlbums } from "../common/interfaces/artistsAlbums";
import { IArtistsTopTracks } from "../common/interfaces/artistsTopTracks";
import { useQuery } from "react-query";
import FollowArtist from "../components/button/FollowArtist";
import { IArtistsRelatedArtists } from "../common/interfaces/artistsRelatedArtists";

export default function Artist() {
  const { id } = useParams();

  const fetchArtist = async () => {
    const artist = await getArtistById(id!);
    return artist.data;
  };

  const fetchArtistTopTracks = async () => {
    const artistTopTracks = await getArtistTopTracks(id!);
    return artistTopTracks.data;
  };

  const fetchArtistAlbums = async () => {
    const artistAlbums = await getArtistAlbums(id!);
    return artistAlbums.data;
  };

  const fetchArtistRelatedArtists = async () => {
    const artistRelatedArtists = await getArtistRelatedArtists(id!);
    return artistRelatedArtists.data;
  };

  const {
    data: artist,
    isLoading: artistIsLoading,
    error: artistError,
  } = useQuery<IArtist>(["artist", id], fetchArtist);

  const {
    data: artistTopTracks,
    isLoading: artistTopTracksIsLoading,
    error: artistTopTracksError,
  } = useQuery<IArtistsTopTracks>(["artist-tracks", id], fetchArtistTopTracks);

  const {
    data: artistAlbums,
    isLoading: artistAlbumsIsLoading,
    error: artistAlbumsError,
  } = useQuery<IArtistsAlbums>(["artist-albums", id], fetchArtistAlbums);

  const {
    data: artistRelatedArtists,
    isLoading: artistRelatedArtistsIsLoading,
    error: artistRelatedArtistsError,
  } = useQuery<IArtistsRelatedArtists>(
    ["artist-related-artists", id],
    fetchArtistRelatedArtists
  );

  return (
    <>
      {artist && artistTopTracks && artistAlbums && artistRelatedArtists && (
        <>
          <Header data={artist} />
          {/* <FollowArtist id={id!} /> */}
          <SectionWrapper title="Popular releases" breadcrumb="true">
            <TrackGrid items={artistTopTracks.tracks} />
          </SectionWrapper>

          <SectionWrapper title="Popular albums" breadcrumb="true">
            <AlbumGrid items={artistAlbums.items} />
          </SectionWrapper>

          <SectionWrapper
            title="Fans also like"
            seeAll={`/artists/${id}/related`}
          >
            <ArtistGrid items={artistRelatedArtists.artists.slice(0, 6)} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
