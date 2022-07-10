import { getArtistById, getArtistTopTracks, getArtistAlbums } from "../spotify";
import { AlbumGrid, TrackGrid } from "../components/grid";
import { SectionWrapper, Header } from "../components";
import { useParams } from "react-router-dom";
import { IArtist } from "../common/interfaces/artist";
import { IArtistsAlbums } from "../common/interfaces/artistsAlbums";
import { IArtistsTopTracks } from "../common/interfaces/artistsTopTracks";
import { useQuery } from "react-query";

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

  return (
    <>
      {artist && artistTopTracks && artistAlbums && (
        <>
          <Header data={artist} />
          <SectionWrapper title="Popular releases" breadcrumb="true">
            <TrackGrid items={artistTopTracks.tracks} />
          </SectionWrapper>

          <SectionWrapper title="Popular albums" breadcrumb="true">
            <AlbumGrid items={artistAlbums.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
