import { SectionWrapper } from "../components";
import { TrackGrid } from "../components/grid";
import { useState } from "react";
import { getTopTracks } from "../spotify";
import { IUsersTopTracks } from "../common/interfaces/usersTopTracks";
import { useQuery } from "react-query";

export default function TopTracks() {
  const [timeRange, setTimeRange] = useState("short");

  const fetchTopTracks = async () => {
    const userTopTracks = await getTopTracks(`${timeRange}_term`);
    return userTopTracks.data;
  };

  const {
    data: topTracks,
    isLoading: topTracksIsLoading,
    error: topTracksError,
  } = useQuery<IUsersTopTracks>(["top-tracks", timeRange], fetchTopTracks);

  return (
    <>
      {topTracks && (
        <>
          <SectionWrapper
            title="Top tracks"
            breadcrumb="true"
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          >
            <TrackGrid items={topTracks.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
