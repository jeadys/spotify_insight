import {
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../spotify";
import { PlaylistGrid, TrackGrid, ArtistGrid } from "../components/grid";
import { SectionWrapper, Loader } from "../components";
import { IUsersTopArtists } from "../common/interfaces/usersTopArtists";
import { IUsersTopTracks } from "../common/interfaces/usersTopTracks";
import { IUsersPlaylists } from "../common/interfaces/usersPlaylists";
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
  } = useQuery<IUsersTopArtists>("top-artists", fetchTopArtists);

  const {
    data: topTracks,
    isLoading: topTracksIsLoading,
    error: topTracksError,
  } = useQuery<IUsersTopTracks>("top-tracks", fetchTopTracks);

  const {
    data: playlists,
    isLoading: playlistsIsLoading,
    error: playlistsError,
  } = useQuery<IUsersPlaylists>("playlists", fetchPlasylists);

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
          <SectionWrapper title="Playlists" seeAll="/playlists">
            <PlaylistGrid items={playlists.items.slice(0, 6)} />
          </SectionWrapper>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
