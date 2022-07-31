import { SectionWrapper } from "../../../components";
import { ArtistGrid } from "../../../components/grid";
import { getArtistRelatedArtists } from "../../../lib/spotify";
import { IArtistsRelatedArtists } from "../../../lib/interfaces/artist-related-artists";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function RelatedArtists() {
  const { query } = useRouter();
  const { id } = query;

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
