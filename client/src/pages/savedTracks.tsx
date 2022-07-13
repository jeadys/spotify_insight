import { SectionWrapper } from "../components";
import { TrackGrid } from "../components/grid";
import { useState } from "react";
import { getCurrentUserSavedTracks } from "../spotify";
import { IUsersSavedTracks } from "../common/interfaces/usersSavedTracks";
import { useQuery } from "react-query";

export default function SavedTracks() {
  const [timeRange, setTimeRange] = useState("short");

  const fetchCurrentUserSavedTracks = async () => {
    const userSavedTracks = await getCurrentUserSavedTracks();
    const track = userSavedTracks.data.items.map((item) => item.track);
    return userSavedTracks.data;
  };

  const {
    data: tracks,
    isLoading: tracksIsLoading,
    error: tracksEror,
  } = useQuery<IUsersSavedTracks>("saved-tracks", fetchCurrentUserSavedTracks);

  return (
    <>
      {tracks && (
        <>
          <SectionWrapper title="Saved tracks" breadcrumb="true">
            <TrackGrid items={tracks.items.map((item) => item.track)} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}