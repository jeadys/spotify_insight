import { getArtistAlbums } from "../spotify";
import { AlbumGrid } from "../components/grid";
import { SectionWrapper } from "../components";
import { useParams } from "react-router-dom";
import { IArtistsAlbums } from "../common/interfaces/artistsAlbums";
import { useQuery } from "react-query";

export default function Albums() {
  const { id } = useParams();

  const fetchArtistAlbums = async () => {
    const artistAlbums = await getArtistAlbums(id!);
    return artistAlbums.data;
  };

  const {
    data: artistAlbums,
    isLoading: artistAlbumsIsLoading,
    error: artistAlbumsError,
  } = useQuery<IArtistsAlbums>(["artist-albums", id], fetchArtistAlbums, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {artistAlbums && (
        <>
          <SectionWrapper title="Popular albums" breadcrumb="true">
            <AlbumGrid items={artistAlbums.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
