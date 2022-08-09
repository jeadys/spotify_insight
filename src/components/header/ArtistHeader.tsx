import { useQuery } from "@tanstack/react-query";

import { IArtistHeader } from "../../lib/interfaces/artist-header";
import { getDoesUserFollowArtist } from "../../lib/spotify";
import BioTitle from "../bio/BioTitle";
import BioValue from "../bio/BioValue";
import { FollowArtistButton } from "../button";

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
        {isArtistFollowed && <FollowArtistButton id={data.id} followed={isArtistFollowed[0]} />}
      </div>

      <div className="w-full flex flex-row gap-x-5 md:gap-x-20 justify-center mt-8">
        {data.followers && (
          <div>
            <BioValue value={data.followers.total.toLocaleString()} />
            <BioTitle title="Followers" />
          </div>
        )}

        {data.genres && data.genres[0] && (
          <div>
            <BioValue value={data.genres[0]} />
            <BioTitle title="Genres" />
          </div>
        )}

        {data.popularity && (
          <div>
            <BioValue value={` ${data.popularity.toString()} %`} />
            <BioTitle title="Popularity" />
          </div>
        )}
      </div>
    </div>
  );
}
