import { useState, useEffect } from "react";
import TrackGrid from "../components/grid/TrackGrid";
import { accessToken, getTopTracks } from "../spotify";
import SectionWrapper from "../components/SectionWrapper";
import TimeRange from "../components/TimeRange";
import Player from "../components/Player";

export default function TopTracks() {
  const [topTracks, settopTracks] = useState(null);
  const [timeRange, setTimeRange] = useState("short");
  const [playingTrack, setPlayingTrack] = useState();

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

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <>
      {topTracks && (
        <>
          <TimeRange timeRange={timeRange} setTimeRange={setTimeRange} />
          <SectionWrapper title="Top tracks" breadcrumb="true">
            <Player token={accessToken} trackUri={playingTrack} />
            <TrackGrid
              tracks={topTracks.items}
              playingTrack={playingTrack}
              chooseTrack={chooseTrack}
            />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
