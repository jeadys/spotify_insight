import { SectionWrapper, TimeRange } from "../components";
import { ArtistGrid } from "../components/grid";
import { useState, useEffect } from "react";
import { getTopArtists } from "../spotify";

export default function TopArtists() {
  const [topArtists, setTopArtists] = useState(null);
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
            <ArtistGrid artists={topArtists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
