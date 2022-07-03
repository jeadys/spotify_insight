import {
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../spotify";
import { PlaylistGrid, TrackGrid, ArtistGrid } from "../components/grid";
import { SectionWrapper } from "../components";
import { useState, useEffect } from "react";
import { IUsersTopArtists } from "../common/interfaces/usersTopArtists";
import { IUsersTopTracks } from "../common/interfaces/usersTopTracks";
import { IUsersPlaylists } from "../common/interfaces/usersPlaylists";

export default function Profile() {
  const [topArtists, setTopArtists] = useState<IUsersTopArtists>();
  const [topTracks, setTopTracks] = useState<IUsersTopTracks>();
  const [playlists, setPlaylists] = useState<IUsersPlaylists>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTopArtists = await getTopArtists("short_term");
        setTopArtists(userTopArtists.data);

        const userTopTracks = await getTopTracks("short_term");
        setTopTracks(userTopTracks.data);

        const userPlaylists = await getCurrentUserPlaylists();
        setPlaylists(userPlaylists.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {topArtists && topTracks && playlists && (
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
      )}
    </>
  );
}
