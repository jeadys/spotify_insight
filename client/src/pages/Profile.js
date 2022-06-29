import { useState, useEffect } from "react";
import ArtistGrid from "../components/grid/ArtistGrid";
import TrackGrid from "../components/grid/TrackGrid";
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks,
} from "../spotify";
import SectionWrapper from "../components/SectionWrapper";
import PlaylistGrid from "../components/grid/PlaylistGrid";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState();
  const [topTracks, setTopTracks] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getCurrentUserProfile();
        setProfile(userProfile.data);

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
