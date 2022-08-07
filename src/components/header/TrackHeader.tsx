import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { ITrackHeader } from "../../lib/interfaces/track-header";
import { getDoesUserHaveAlbumSaved } from "../../lib/spotify";
import { getYear } from "../../lib/utils";
import { SaveAlbum } from "../button";

export default function TrackHeader({ data }: ITrackHeader) {
  const queryClient = useQueryClient();
  const { asPath } = useRouter();

  const fetchDoesUserHaveAlbumSaved = async () => {
    const isAlbumSaved = await getDoesUserHaveAlbumSaved(data.id);
    return isAlbumSaved.data;
  };

  const { data: isAlbumSaved } = useQuery(
    ["is-album-saved", data.id],
    fetchDoesUserHaveAlbumSaved,
    {
      staleTime: Infinity,
      enabled: !!queryClient.getQueryData(["album", data.id]),
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="mt-5">
      <Image
        src={data.images.length && data.images[0] ? data.images[0].url : "/images/nocover.webp"}
        className="object-cover rounded-md"
        width={320}
        height={320}
        layout="fixed"
        alt={data.name}
      />

      <div className="gap-y-2 flex flex-col mt-5 mx items-center">
        <div className="text-2xl md:text-4xl font-black text-white">{data.name}</div>

        {data.owner && data.owner !== undefined && (
          <span className="text-sm text-slate-400">By {data.owner.display_name}</span>
        )}

        {data.release_date && data.release_date !== undefined && (
          <span className="text-sm text-slate-400">Released in {getYear(data.release_date)}</span>
        )}

        {data.tracks && data.tracks !== undefined && (
          <div className="text-sm text-white font-semibold">
            {data.tracks.total < 50 ? data.tracks.total : "50"} tracks
          </div>
        )}

        <div className="h-5">
          {isAlbumSaved && <SaveAlbum id={data.id} saved={isAlbumSaved[0]} />}
        </div>

        {asPath == `/playlists/${data.id}` && (
          <Link href={`/recommendations/${data.id}`}>
            <a className="bg-green-600 text-white max-w-fit py-2 px-5 rounded-full cursor-pointer my-5 font-semibold">
              Get recommendations
            </a>
          </Link>
        )}

        {asPath == `/albums/${data.id}` && (
          <div className="my-5">
            <span className="text-2xl font-black text-blue-400">{data.popularity}%</span>
            <span className="text-lg font-semibold text-white block">Popularity</span>
          </div>
        )}
      </div>
    </div>
  );
}
