import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { SectionWrapper } from "../../components/core";
import { TrackGrid } from "../../components/grid";
import { TrackGridSkeleton } from "../../components/skeleton";
import { IUsersTopTracks } from "../../lib/interfaces/users-top-tracks";
import { getTopTracks } from "../../lib/spotify";

export default function TopTracks() {
  const [timeRange, setTimeRange] = useState("short");

  const fetchTopTracks = async () => {
    const userTopTracks = await getTopTracks(`${timeRange}_term`, 50);
    return userTopTracks.data;
  };

  const { data: topTracks } = useQuery<IUsersTopTracks>(["top-tracks", timeRange], fetchTopTracks, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {topTracks ? (
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
      ) : (
        <TrackGridSkeleton amount={50} />
      )}
    </>
  );
}
