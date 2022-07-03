import { SectionWrapper, TimeRange } from "../components";
import { ArtistGrid } from "../components/grid";
import { useState, useEffect } from "react";
import { getTopArtists } from "../spotify";
import { IUsersTopArtists } from "../common/interfaces/usersTopArtists";

export default function TopArtists() {
  const [topArtists, setTopArtists] = useState<IUsersTopArtists>();
  const [timeRange, setTimeRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTopArtists = await getTopArtists(`${timeRange}_term`);
        setTopArtists(userTopArtists.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [timeRange]);

  return (
    <>
      {topArtists && (
        <>
          <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
          <SectionWrapper title="Top artists" breadcrumb="true">
            <ArtistGrid items={topArtists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
