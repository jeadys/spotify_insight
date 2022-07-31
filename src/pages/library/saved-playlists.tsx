import { getCurrentUserPlaylists } from "../../lib/spotify";
import { PlaylistGrid } from "../../components/grid";
import { SectionWrapper } from "../../components";
import { IUsersPlaylists } from "../../lib/interfaces/user-saved-playlists";
import { useQuery } from "react-query";

export default function SavedPlaylists() {
  const fetchPlaylists = async () => {
    const playlists = await getCurrentUserPlaylists();
    return playlists.data;
  };

  const {
    data: playlists,
    isLoading: playlistsIsLoading,
    error: playlistsError,
  } = useQuery<IUsersPlaylists>("playlists", fetchPlaylists, {
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
