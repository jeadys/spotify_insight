import {
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../../spotify";
import { TrackGrid, ArtistGrid } from "../../components/grid";
import { SectionWrapper, Loader } from "../../components";
import { IUsersTopArtists } from "../../lib/interfaces/user-top-artists";
import { IUsersTopTracks } from "../../lib/interfaces/users-top-tracks";
import { IUsersPlaylists } from "../../lib/interfaces/user-saved-playlists";
import { useQuery } from "react-query";

export default function Profile() {
  const fetchTopArtists = async () => {
    const userTopArtists = await getTopArtists("short_term");
    return userTopArtists.data;
  };

  const fetchTopTracks = async () => {
    const userTopTracks = await getTopTracks("short_term");
    return userTopTracks.data;
  };

  const fetchPlasylists = async () => {
    const userPlaylists = await getCurrentUserPlaylists();
    return userPlaylists.data;
  };

  const {
    data: topArtists,
    isLoading: topArtistsIsLoading,
    error: topArtistsError,
  } = useQuery<IUsersTopArtists>("top-artists", fetchTopArtists, {
    refetchOnWindowFocus: false,
  });

  const {
    data: topTracks,
    isLoading: topTracksIsLoading,
    error: topTracksError,
  } = useQuery<IUsersTopTracks>("top-tracks", fetchTopTracks, {
    refetchOnWindowFocus: false,
  });

  const {
    data: playlists,
    isLoading: playlistsIsLoading,
    error: playlistsError,
  } = useQuery<IUsersPlaylists>("playlists", fetchPlasylists, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {topArtists && topTracks && playlists ? (
        <>
          <SectionWrapper title="Top artists this month" seeAll="/top-artists">
            <ArtistGrid items={topArtists.items.slice(0, 12)} />
          </SectionWrapper>
          <SectionWrapper title="Top tracks this month" seeAll="/top-tracks">
            <TrackGrid items={topTracks.items.slice(0, 6)} />
          </SectionWrapper>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
