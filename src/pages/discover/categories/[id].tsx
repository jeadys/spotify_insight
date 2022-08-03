import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { SectionWrapper } from "../../../components";
import { PlaylistGrid } from "../../../components/grid";
import { ICategoryPlaylist } from "../../../lib/interfaces/category-playlist";
import { getCategoryPlaylists } from "../../../lib/spotify";

export default function Category() {
  const { query } = useRouter();
  const { id } = query;

  const fetchCategory = async () => {
    const category = await getCategoryPlaylists(id!, 50);
    return category.data;
  };

  const { data: category } = useQuery<ICategoryPlaylist>(["category", id], fetchCategory, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {category && (
        <>
          <SectionWrapper title="Playlists" breadcrumb="true">
            <PlaylistGrid items={category.playlists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
