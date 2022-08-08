import { useQuery } from "@tanstack/react-query";

import { IArtistHeader } from "../../lib/interfaces/artist-header";
import { getDoesUserFollowArtist } from "../../lib/spotify";
import { FollowArtist } from "../button";

export default function ArtistHeader({ data }: IArtistHeader) {
  const fetchDoesUserFollowArtist = async () => {
    const isArtistFollowed = await getDoesUserFollowArtist(data.id);
    return isArtistFollowed.data;
  };

  const { data: isArtistFollowed } = useQuery(
    ["is-artist-followed", data.id],
    fetchDoesUserFollowArtist,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="text-center">
      <img
        src={data.images.length && data.images[0] ? data.images[0].url : "/images/nocover.webp"}
        className="w-96 h-96 object-cover rounded-md mx-auto"
        alt={data.name}
      />
      <div className="text-3xl md:text-6xl lg:text-8xl font-black text-white mt-8">{data.name}</div>

      <div className="h-5 mt-8">
        {isArtistFollowed && <FollowArtist id={data.id} followed={isArtistFollowed[0]} />}
      </div>

      <div className="w-full flex gap-y-5 flex-col md:flex-row md:gap-x-20 justify-center mt-8">
        {data.followers !== undefined && (
          <div>
            <span className="text-2xl font-black text-blue-400">
              {data.followers.total.toLocaleString()}
            </span>
            <span className="text-lg font-semibold text-white block">Followers</span>
          </div>
        )}

        {data.genres && data.genres[0] !== undefined && (
          <div>
            <span className="text-2xl font-black text-blue-400">{data.genres[0]}</span>
            <span className="text-lg font-semibold text-white block">Genres</span>
          </div>
        )}

        {data.popularity !== undefined && (
          <div>
            <span className="text-2xl font-black text-blue-400">{data.popularity}%</span>
            <span className="text-lg font-semibold text-white block">Popularity</span>
          </div>
        )}
      </div>
    </div>
  );
}
