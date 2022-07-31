import { getCategoryPlaylists } from "../../../lib/spotify";
import { useQuery } from "react-query";
import { PlaylistGrid } from "../../../components/grid";
import { useRouter } from "next/router";
import { SectionWrapper } from "../../../components";

export default function Category() {
  const { query } = useRouter();
  const { id } = query;

  const fetchCategory = async () => {
    const category = await getCategoryPlaylists(id!);
    return category.data;
  };

  const {
    data: category,
    isLoading: categoryIsLoading,
    error: categoryError,
  } = useQuery(["category", id], fetchCategory, {
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
