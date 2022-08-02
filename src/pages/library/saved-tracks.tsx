import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../components";
import { TrackGrid } from "../../components/grid";
import { IUsersSavedTracks } from "../../lib/interfaces/user-saved-tracks";
import { getCurrentUserSavedTracks } from "../../lib/spotify";

export default function SavedTracks() {
  const fetchCurrentUserSavedTracks = async () => {
    const userSavedTracks = await getCurrentUserSavedTracks(50);
    return userSavedTracks.data;
  };

  const { data: tracks } = useQuery<IUsersSavedTracks>(
    ["saved-tracks"],
    fetchCurrentUserSavedTracks,
    { refetchOnWindowFocus: false }
  );

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
