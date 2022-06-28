import { useState, useEffect } from "react";
import TrackGrid from "../components/grid/TrackGrid";
import { getTopTracks } from "../spotify";
import SectionWrapper from "../components/SectionWrapper";
import TimeRange from "../components/TimeRange";

export default function TopTracks() {
  const [topTracks, settopTracks] = useState(null);
  const [timeRange, setTimeRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTopTracks = await getTopTracks(`${timeRange}_term`);
        settopTracks(userTopTracks.data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [timeRange]);

  return (
    <>
      {topTracks && (
        <>
          <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
          <SectionWrapper title="Top tracks" breadcrumb="true">
            <TrackGrid tracks={topTracks.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
