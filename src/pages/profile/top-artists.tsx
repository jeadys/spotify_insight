import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { SectionWrapper } from "../../components";
import { ArtistGrid } from "../../components/grid";
import { ArtistGridSkeleton } from "../../components/skeleton";
import { IUsersTopArtists } from "../../lib/interfaces/user-top-artists";
import { getTopArtists } from "../../lib/spotify";

export default function TopArtists() {
  const [timeRange, setTimeRange] = useState("short");

  const fetchTopArtists = async () => {
    const userTopArtists = await getTopArtists(`${timeRange}_term`, 50);
    return userTopArtists.data;
  };

  const { data: topArtists } = useQuery<IUsersTopArtists>(
    ["top-artists", timeRange],
    fetchTopArtists,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {topArtists ? (
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
      ) : (
        <ArtistGridSkeleton amount={50} />
      )}
    </>
  );
}
