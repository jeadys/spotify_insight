import { useQuery } from "@tanstack/react-query";

import { Loader, SectionWrapper } from "../../components";
import { ArtistGrid, TrackGrid } from "../../components/grid";
import { IUsersTopArtists } from "../../lib/interfaces/user-top-artists";
import { IUsersTopTracks } from "../../lib/interfaces/users-top-tracks";
import { getTopArtists, getTopTracks } from "../../lib/spotify";

export default function Profile() {
  const fetchTopArtists = async () => {
    const userTopArtists = await getTopArtists("short_term", 12);
    return userTopArtists.data;
  };

  const fetchTopTracks = async () => {
    const userTopTracks = await getTopTracks("short_term", 6);
    return userTopTracks.data;
  };

  const { data: topArtists } = useQuery<IUsersTopArtists>(["top-artists"], fetchTopArtists, {
    refetchOnWindowFocus: false,
  });

  const { data: topTracks } = useQuery<IUsersTopTracks>(["top-tracks"], fetchTopTracks, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {topArtists && topTracks && (
        <>
          <SectionWrapper title="Top artists this month" seeAll="/profile/top-artists">
            <ArtistGrid items={topArtists.items.slice(0, 12)} />
          </SectionWrapper>
          <SectionWrapper title="Top tracks this month" seeAll="/profile/top-tracks">
            <TrackGrid items={topTracks.items.slice(0, 6)} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
