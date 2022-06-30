import {
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../spotify";
import { PlaylistGrid, TrackGrid, ArtistGrid } from "../components/grid";
import { SectionWrapper } from "../components";
import { useState, useEffect } from "react";

export default function Profile() {
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState(null);
  const [playlists, setPlaylists] = useState(null);

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
            <ArtistGrid artists={topArtists.items.slice(0, 12)} />
          </SectionWrapper>
          <SectionWrapper title="Top tracks this month" seeAll="/top-tracks">
            <TrackGrid tracks={topTracks.items.slice(0, 6)} />
          </SectionWrapper>
          <SectionWrapper title="Playlists" seeAll="/playlists">
            <PlaylistGrid playlists={playlists.items.slice(0, 6)} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
