import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../components";
import { PlaylistGrid } from "../../components/grid";
import { PlaylistGridSkeleton } from "../../components/skeleton";
import { IUsersSavedPlaylists } from "../../lib/interfaces/user-saved-playlists";
import { getCurrentUserSavedPlaylists } from "../../lib/spotify";

export default function SavedPlaylists() {
  const fetchPlaylists = async () => {
    const playlists = await getCurrentUserSavedPlaylists(50);
    return playlists.data;
  };

  const { data: playlists } = useQuery<IUsersSavedPlaylists>(
    ["all-saved-playlists"],
    fetchPlaylists,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {playlists ? (
        <>
          <SectionWrapper title="Saved playlists" breadcrumb="true">
            <PlaylistGrid items={playlists.items} />
          </SectionWrapper>
        </>
      ) : (
        <PlaylistGridSkeleton amount={50} />
      )}
    </>
  );
}
