import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { SectionWrapper } from "../../../components";
import { ArtistGrid } from "../../../components/grid";
import { ArtistGridSkeleton } from "../../../components/skeleton";
import { IArtistsRelatedArtists } from "../../../lib/interfaces/artist-related-artists";
import { getArtistRelatedArtists } from "../../../lib/spotify";

export default function RelatedArtists() {
  const { query } = useRouter();
  const { id } = query;

  const fetchArtistRelatedArtists = async () => {
    const artistRelatedArtists = await getArtistRelatedArtists(id!);
    return artistRelatedArtists.data;
  };

  const { data: artistRelatedArtists } = useQuery<IArtistsRelatedArtists>(
    ["artist-related-artists", id],
    fetchArtistRelatedArtists,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <>
      {artistRelatedArtists ? (
        <>
          <SectionWrapper title="Fans also like" breadcrumb="true">
            <ArtistGrid items={artistRelatedArtists.artists} />
          </SectionWrapper>
        </>
      ) : (
        <ArtistGridSkeleton amount={50} />
      )}
    </>
  );
}
