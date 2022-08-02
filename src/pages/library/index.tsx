import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../components";
import { AlbumGrid, ArtistGrid, PlaylistGrid, TrackGrid } from "../../components/grid";
import { IUsersFollowedArtists } from "../../lib/interfaces/user-followed-artists";
import { IUsersSavedAlbums } from "../../lib/interfaces/user-saved-albums";
import { IUsersSavedPlaylists } from "../../lib/interfaces/user-saved-playlists";
import { IUsersSavedTracks } from "../../lib/interfaces/user-saved-tracks";
import {
  getCurrentUserFollowedArtists,
  getCurrentUserSavedAlbums,
  getCurrentUserSavedPlaylists,
  getCurrentUserSavedTracks,
} from "../../lib/spotify";

const fetchUserSavedPlaylists = async () => {
  const userPlaylists = await getCurrentUserSavedPlaylists(6);
  return userPlaylists.data;
};

const fetchUsersSavedAlbums = async () => {
  const userSavedAlbums = await getCurrentUserSavedAlbums(6);
  return userSavedAlbums.data;
};

const fetchUserSavedTracks = async () => {
  const userSavedTracks = await getCurrentUserSavedTracks(6);
  return userSavedTracks.data;
};

const fetchUserFollowedArtists = async () => {
  const userFollowedArtists = await getCurrentUserFollowedArtists(12);
  return userFollowedArtists.data;
};

export default function Library() {
  const { data: savedPlaylists } = useQuery<IUsersSavedPlaylists>(
    ["saved-playlists"],
    fetchUserSavedPlaylists,
    { refetchOnWindowFocus: false }
  );

  const { data: savedAlbums } = useQuery<IUsersSavedAlbums>(
    ["saved-albums"],
    fetchUsersSavedAlbums,
    { refetchOnWindowFocus: false }
  );

  const { data: savedTracks } = useQuery<IUsersSavedTracks>(
    ["saved-tracks"],
    fetchUserSavedTracks,
    { refetchOnWindowFocus: false }
  );

  const { data: followedArtists } = useQuery<IUsersFollowedArtists>(
    ["followed-artists"],
    fetchUserFollowedArtists,
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      {savedPlaylists && savedAlbums && savedTracks && followedArtists && (
        <>
          <SectionWrapper title="Playlists" seeAll="/library/saved-playlists">
            <PlaylistGrid items={savedPlaylists.items.slice(0, 6)} />
          </SectionWrapper>

          <SectionWrapper title="Saved albums" seeAll="/library/saved-albums">
            <AlbumGrid items={savedAlbums.items.map((item) => item.album).slice(0, 6)} />
          </SectionWrapper>

          <SectionWrapper title="Saved tracks" seeAll="/library/saved-tracks">
            <TrackGrid items={savedTracks.items.map((item) => item.track).slice(0, 6)} />
          </SectionWrapper>

          <SectionWrapper title="Followed artists" seeAll="/library/followed-artists">
            <ArtistGrid items={followedArtists.artists.items.slice(0, 12)} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
