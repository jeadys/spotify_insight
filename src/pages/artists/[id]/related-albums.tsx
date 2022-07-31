import { getArtistAlbums } from "../../../spotify";
import { AlbumGrid } from "../../../components/grid";
import { SectionWrapper } from "../../../components";
import { useRouter } from "next/router";
import { IArtistsAlbums } from "../../../lib/interfaces/artist-album";
import { useQuery } from "react-query";

export default function RelatedAlbums() {
  const { query } = useRouter();
  const { id } = query;

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
