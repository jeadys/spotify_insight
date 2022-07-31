import { SectionWrapper } from "../../components";
import { ArtistGrid } from "../../components/grid";
import { getCurrentUserFollowedArtists } from "../../lib/spotify";
import { useQuery } from "react-query";
import { IUsersFollowedArtists } from "../../lib/interfaces/user-followed-artists";

export default function FollowedArtists() {
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
    fetchUserFollowedArtists,
    { refetchOnWindowFocus: false }
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
