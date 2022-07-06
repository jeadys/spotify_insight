import { SectionWrapper } from "../components";
import { ArtistGrid } from "../components/grid";
import { useState } from "react";
import { getTopArtists } from "../spotify";
import { IUsersTopArtists } from "../common/interfaces/usersTopArtists";
import { useQuery } from "react-query";

export default function TopArtists() {
  const [timeRange, setTimeRange] = useState("short");

  const fetchTopArtists = async () => {
    const userTopArtists = await getTopArtists(`${timeRange}_term`);
    return userTopArtists.data;
  };

  const {
    data: topArtists,
    isLoading: topArtistsIsLoading,
    error: topArtistsError,
  } = useQuery<IUsersTopArtists>(["top-artists", timeRange], fetchTopArtists);

  return (
    <>
      {topArtists && (
        <>
          <SectionWrapper
            title="Top artists"
            breadcrumb="true"
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          >
            <ArtistGrid items={topArtists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
