import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { SectionWrapper } from "../../../components/core";
import { AlbumGrid } from "../../../components/grid";
import { AlbumGridSkeleton } from "../../../components/skeleton";
import { IArtistsAlbums } from "../../../lib/interfaces/artist-album";
import { getArtistAlbums } from "../../../lib/spotify";

export default function RelatedAlbums() {
  const { query } = useRouter();
  const { id } = query;

  const fetchArtistAlbums = async () => {
    const artistAlbums = await getArtistAlbums(id!, 50);
    return artistAlbums.data;
  };

  const { data: artistAlbums } = useQuery<IArtistsAlbums>(
    ["all-artist-albums", id],
    fetchArtistAlbums,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {artistAlbums ? (
        <>
          <SectionWrapper title="Popular albums" breadcrumb="true">
            <AlbumGrid items={artistAlbums.items} />
          </SectionWrapper>
        </>
      ) : (
        <AlbumGridSkeleton amount={50} />
      )}
    </>
  );
}
