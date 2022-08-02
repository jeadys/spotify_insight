import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { SectionWrapper } from "../../../components";
import { AlbumGrid } from "../../../components/grid";
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
    ["artist-albums", id],
    fetchArtistAlbums,
    {
      refetchOnWindowFocus: false,
    }
  );

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
