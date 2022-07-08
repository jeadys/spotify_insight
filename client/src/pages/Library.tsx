import React from "react";
import { useQuery } from "react-query";
import {
  getCurrentUserFollowedArtists,
  getCurrentUserPlaylists,
  getCurrentUserSavedAlbums,
  getCurrentUserSavedTracks,
} from "../spotify";
import { IUsersFollowedArtists } from "../common/interfaces/usersFollowedArtists";
import {
  ArtistGrid,
  PlaylistGrid,
  AlbumGrid,
  TrackGrid,
} from "../components/grid";
import { SectionWrapper } from "../components";
import { IUsersPlaylists } from "../common/interfaces/usersPlaylists";
import { IUsersSavedAlbums } from "../common/interfaces/usersSavedAlbums";
import { IUsersSavedTracks } from "../common/interfaces/usersSavedTracks";

export default function Library() {
  const fetchUserFollowedArtists = async () => {
    const userFollowedArtists = await getCurrentUserFollowedArtists();
    return userFollowedArtists.data;
  };

  const fetchPlaylists = async () => {
    const userPlaylists = await getCurrentUserPlaylists();
    return userPlaylists.data;
  };

  const fetchUsersSavedAlbums = async () => {
    const userSavedAlbums = await getCurrentUserSavedAlbums();
    // const album = userSavedAlbums.data.items.map((item) => item.album);
    return userSavedAlbums.data;
  };

  const fetchUserSavedTracks = async () => {
    const userSavedTracks = await getCurrentUserSavedTracks();
    // const track = userSavedTracks.data.items.map((item) => item.track);
    return userSavedTracks.data;
  };

  const {
    data: followedArtists,
    isLoading: followedArtistsIsLoading,
    error: followedArtistsError,
  } = useQuery<IUsersFollowedArtists>(
    "followed-artists",
    fetchUserFollowedArtists
  );

  const {
    data: playlists,
    isLoading: playlistsIsLoading,
    error: playlistsError,
  } = useQuery<IUsersPlaylists>("playlists", fetchPlaylists);

  const {
    data: albums,
    isLoading: albumsIsLoading,
    error: albumsError,
  } = useQuery<IUsersSavedAlbums>("saved-albums", fetchUsersSavedAlbums);

  const {
    data: tracks,
    isLoading: tracksIsLoading,
    error: tracksEror,
  } = useQuery<IUsersSavedTracks>("saved-tracks", fetchUserSavedTracks);

  return (
    <>
      {followedArtists && playlists && albums && tracks && (
        <>
          <SectionWrapper title="Playlists" seeAll="/library/saved-playlists">
            <PlaylistGrid items={playlists.items.slice(0, 6)} />
          </SectionWrapper>

          <SectionWrapper title="Saved albums" seeAll="/library/saved-albums">
            <AlbumGrid
              items={albums.items.map((item) => item.album).slice(0, 6)}
            />
          </SectionWrapper>

          <SectionWrapper title="Saved tracks" seeAll="/library/saved-tracks">
            <TrackGrid
              items={tracks.items.map((item) => item.track).slice(0, 6)}
            />
          </SectionWrapper>

          <SectionWrapper
            title="Followed artists"
            seeAll="/library/followed-artists"
          >
            <ArtistGrid items={followedArtists.artists.items.slice(0, 12)} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
