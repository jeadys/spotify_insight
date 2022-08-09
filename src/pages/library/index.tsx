import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../components/core";
import { AlbumGrid, ArtistGrid, PlaylistGrid, TrackGrid } from "../../components/grid";
import {
  AlbumGridSkeleton,
  ArtistGridSkeleton,
  PlaylistGridSkeleton,
  TrackGridSkeleton,
} from "../../components/skeleton";
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

export default function Library() {
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

  const { data: savedPlaylists } = useQuery<IUsersSavedPlaylists>(
    ["saved-playlists"],
    fetchUserSavedPlaylists,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const { data: savedAlbums } = useQuery<IUsersSavedAlbums>(
    ["saved-albums"],
    fetchUsersSavedAlbums,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const { data: savedTracks } = useQuery<IUsersSavedTracks>(
    ["saved-tracks"],
    fetchUserSavedTracks,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const { data: followedArtists } = useQuery<IUsersFollowedArtists>(
    ["followed-artists"],
    fetchUserFollowedArtists,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {savedPlaylists && savedAlbums && savedTracks && followedArtists ? (
        <>
          <SectionWrapper title="Playlists" seeAll="/library/saved-playlists">
            <PlaylistGrid items={savedPlaylists.items} />
          </SectionWrapper>

          <SectionWrapper title="Saved albums" seeAll="/library/saved-albums">
            <AlbumGrid items={savedAlbums.items.map((item) => item.album)} />
          </SectionWrapper>

          <SectionWrapper title="Saved tracks" seeAll="/library/saved-tracks">
            <TrackGrid items={savedTracks.items.map((item) => item.track)} />
          </SectionWrapper>

          <SectionWrapper title="Followed artists" seeAll="/library/followed-artists">
            <ArtistGrid items={followedArtists.artists.items} />
          </SectionWrapper>
        </>
      ) : (
        <>
          <PlaylistGridSkeleton amount={6} />
          <AlbumGridSkeleton amount={6} />
          <TrackGridSkeleton amount={6} />
          <ArtistGridSkeleton amount={12} />
        </>
      )}
    </>
  );
}
