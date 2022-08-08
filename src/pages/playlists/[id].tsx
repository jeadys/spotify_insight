import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { SectionWrapper } from "../../components";
import { TrackGrid } from "../../components/grid";
import { TrackHeader } from "../../components/header";
import { TrackGridSkeleton, TrackHeaderSkeleton } from "../../components/skeleton";
import { IPlaylist } from "../../lib/interfaces/playlist";
import { getPlaylistById } from "../../lib/spotify";

export default function Playlist() {
  const { query } = useRouter();
  const { id } = query;

  const fetchPlaylist = async () => {
    const playlist = await getPlaylistById(id!);
    return playlist.data;
  };

  const { data: playlist } = useQuery<IPlaylist>(["playlist", id], fetchPlaylist, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {playlist ? (
        <>
          <div className="flex lg:space-x-10 flex-wrap">
            <div className="basis-full xl:basis-1/4 text-center xl:sticky xl:top-0 xl:self-start">
              <TrackHeader data={playlist} />
            </div>
            <div className="flex-grow">
              <SectionWrapper title="Playlist tracks" breadcrumb="true">
                <TrackGrid items={playlist.tracks.items.map(({ track }) => track).slice(0, 50)} />
              </SectionWrapper>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex lg:space-x-10 flex-wrap">
            <div className="basis-full xl:basis-1/4 text-center xl:sticky xl:top-0 xl:self-start">
              <TrackHeaderSkeleton />
            </div>
            <div className="flex-grow">
              <TrackGridSkeleton amount={50} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
