import { getCurrentUserPlaylists } from "../spotify";
import { PlaylistGrid } from "../components/grid";
import { SectionWrapper } from "../components";
import { IUsersPlaylists } from "../common/interfaces/usersPlaylists";
import { useQuery } from "react-query";

export default function Playlists() {
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
          <SectionWrapper title="Playlists" breadcrumb="true">
            <PlaylistGrid items={playlists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
