import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../components";
import { PlaylistGrid } from "../../components/grid";
import { IFeaturedPlaylists } from "../../lib/interfaces/featured-playlists";
import { getFeaturedPlaylists } from "../../lib/spotify";

export default function FeaturedPlaylists() {
  const fetchFeaturedPlaylists = async () => {
    const featuredPlaylists = await getFeaturedPlaylists(50);
    return featuredPlaylists.data;
  };

  const { data: featured } = useQuery<IFeaturedPlaylists>(
    ["all-featured-playlists"],
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
