import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../components";
import { PlaylistGrid } from "../../components/grid";
import { IUsersSavedPlaylists } from "../../lib/interfaces/user-saved-playlists";
import { getCurrentUserSavedPlaylists } from "../../lib/spotify";

export default function SavedPlaylists() {
  const fetchPlaylists = async () => {
    const playlists = await getCurrentUserSavedPlaylists(50);
    return playlists.data;
  };

  const { data: playlists } = useQuery<IUsersSavedPlaylists>(["playlists"], fetchPlaylists, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {playlists && (
        <>
          <SectionWrapper title="Saved playlists" breadcrumb="true">
            <PlaylistGrid items={playlists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
