import { SectionWrapper } from "../components";
import { AlbumGrid } from "../components/grid";
import { getCurrentUserSavedAlbums } from "../spotify";
import { IUsersSavedAlbums } from "../common/interfaces/usersSavedAlbums";
import { useQuery } from "react-query";

export default function SavedTracks() {
  const fetchCurrentUserSavedAlbums = async () => {
    const userSavedAlbums = await getCurrentUserSavedAlbums();
    return userSavedAlbums.data;
  };

  const {
    data: tracks,
    isLoading: tracksIsLoading,
    error: tracksEror,
  } = useQuery<IUsersSavedAlbums>("saved-albums", fetchCurrentUserSavedAlbums, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {tracks && (
        <>
          <SectionWrapper title="Saved albums" breadcrumb="true">
            <AlbumGrid items={tracks.items.map((item) => item.album)} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
