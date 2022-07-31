import { SectionWrapper } from "../../components";
import { getFeaturedPlaylists } from "../../lib/spotify";
import { PlaylistGrid } from "../../components/grid";
import { IFeaturedPlaylists } from "../../lib/interfaces/featured-playlists";
import { useQuery } from "react-query";

export default function FeaturedPlaylists() {
  const fetchFeaturedPlaylists = async () => {
    const featuredPlaylists = await getFeaturedPlaylists();
    return featuredPlaylists.data;
  };

  const {
    data: featured,
    isLoading: featuredIsLoading,
    error: featuredError,
  } = useQuery<IFeaturedPlaylists>(
    "featured-playlists",
    fetchFeaturedPlaylists,
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      {featured && (
        <>
          <SectionWrapper title="Featured playlists" breadcrumb="true">
            <PlaylistGrid items={featured.playlists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
