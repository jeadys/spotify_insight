import { SectionWrapper } from "../components";
import { ArtistGrid } from "../components/grid";
import { getArtistRelatedArtists } from "../spotify";
import { IArtistsRelatedArtists } from "../common/interfaces/artistsRelatedArtists";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function RelatedArtists() {
  const { id } = useParams();

  const fetchArtistRelatedArtists = async () => {
    const artistRelatedArtists = await getArtistRelatedArtists(id!);
    return artistRelatedArtists.data;
  };

  const {
    data: artistRelatedArtists,
    isLoading: artistRelatedArtistsIsLoading,
    error: artistRelatedArtistsError,
  } = useQuery<IArtistsRelatedArtists>(
    ["artist-related-artists", id],
    fetchArtistRelatedArtists,
    { refetchOnWindowFocus: false }
  );
  return (
    <>
      {artistRelatedArtists && (
        <>
          <SectionWrapper title="Fans also like" breadcrumb="true">
            <ArtistGrid items={artistRelatedArtists.artists} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
