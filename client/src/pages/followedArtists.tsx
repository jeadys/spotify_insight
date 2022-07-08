import { SectionWrapper } from "../components";
import { ArtistGrid } from "../components/grid";
import { useState } from "react";
import { getCurrentUserFollowedArtists } from "../spotify";
import { useQuery } from "react-query";
import { IUsersFollowedArtists } from "../common/interfaces/usersFollowedArtists";

export default function TopArtists() {
  const fetchUserFollowedArtists = async () => {
    const userFollowedArtists = await getCurrentUserFollowedArtists();
    return userFollowedArtists.data;
  };

  const {
    data: followedArtists,
    isLoading: followedArtistsIsLoading,
    error: followedArtistsError,
  } = useQuery<IUsersFollowedArtists>(
    "followed-artists",
    fetchUserFollowedArtists
  );

  return (
    <>
      {followedArtists && (
        <>
          <SectionWrapper title="Followed artists" breadcrumb="true">
            <ArtistGrid items={followedArtists.artists.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
