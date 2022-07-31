import { IArtistHeader } from "../common/interfaces/artistHeader";
import { useQuery } from "react-query";
import { getDoesUserFollowArtist } from "../spotify";
import { FollowArtist } from "./button";

export default function ArtistHeader({ data }: IArtistHeader) {
  const fetchDoesUserFollowArtist = async () => {
    const isArtistFollowed = await getDoesUserFollowArtist(data.id);
    return isArtistFollowed.data;
  };

  const { data: isArtistFollowed, isLoading } = useQuery(
    ["is-artist-followed", data.id],
    fetchDoesUserFollowArtist,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {data.images.length && data.images[0] ? (
        <img
          className="w-96 h-96 object-cover mx-auto rounded-md"
          src={data.images[0].url}
          alt={data.name}
        />
      ) : (
        <img
          className="w-96 h-96 object-cover mx-auto rounded-md"
          src="/images/nocover.webp"
          alt={data.name}
        />
      )}
      <div className="text-3xl md:text-6xl lg:text-8xl font-black text-white text-center">
        {data.name}
      </div>

      <div className="h-5">
        {isArtistFollowed && (
          <FollowArtist id={data.id} followed={isArtistFollowed[0]} />
        )}
      </div>

      <div className="w-full flex gap-y-5 flex-col md:flex-row md:gap-x-20 justify-center text-center">
        {data.followers !== undefined && (
          <div>
            <span className="text-2xl font-black text-blue-400">
              {data.followers.total.toLocaleString()}
            </span>
            <span className="text-lg font-semibold text-white block">
              Followers
            </span>
          </div>
        )}

        {data.genres && data.genres[0] !== undefined && (
          <div>
            <span className="text-2xl font-black text-blue-400">
              {data.genres[0]}
            </span>
            <span className="text-lg font-semibold text-white block">
              Genres
            </span>
          </div>
        )}

        {data.popularity !== undefined && (
          <div>
            <span className="text-2xl font-black text-blue-400">
              {data.popularity}%
            </span>
            <span className="text-lg font-semibold text-white block">
              Popularity
            </span>
          </div>
        )}
      </div>
    </>
  );
}
