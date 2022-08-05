import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../components";
import { AlbumGrid } from "../../components/grid";
import { IUsersSavedAlbums } from "../../lib/interfaces/user-saved-albums";
import { getCurrentUserSavedAlbums } from "../../lib/spotify";

export default function SavedAlbums() {
  const fetchCurrentUserSavedAlbums = async () => {
    const userSavedAlbums = await getCurrentUserSavedAlbums(50);
    return userSavedAlbums.data;
  };

  const { data: tracks } = useQuery<IUsersSavedAlbums>(
    ["all-saved-albums"],
    fetchCurrentUserSavedAlbums,
    { refetchOnWindowFocus: false }
  );

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
