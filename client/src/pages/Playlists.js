import { useState, useEffect } from "react";
import SectionWrapper from "../components/SectionWrapper";
import PlaylistGrid from "../components/grid/PlaylistGrid";
import { getCurrentUserPlaylists } from "../spotify";

export default function Playlists() {
  const [playlists, setPlaylists] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      {playlists && (
        <>
          <SectionWrapper title="Playlists" breadcrumb="true">
            <PlaylistGrid playlists={playlists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
