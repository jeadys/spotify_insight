import { useState, useEffect } from "react";
import ArtistGrid from "../components/grid/ArtistGrid";
import { getTopArtists } from "../spotify";
import SectionWrapper from "../components/SectionWrapper";
import TimeRange from "../components/TimeRange";

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
