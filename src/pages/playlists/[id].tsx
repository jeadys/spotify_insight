import { SectionWrapper } from "../../components";
import { TrackHeader } from "../../components/header";
import { TrackGrid } from "../../components/grid";
import { getPlaylistById } from "../../lib/spotify";
import { useRouter } from "next/router";
import { IPlaylist } from "../../lib/interfaces/playlist";
import { useQuery } from "react-query";

export default function Playlist() {
  const { query } = useRouter();
  const { id } = query;

  const fetchPlaylist = async () => {
    const playlist = await getPlaylistById(id!);
    return playlist.data;
  };

  const {
    data: playlist,
    isLoading: playlistIsLoading,
    error: playlistError,
  } = useQuery<IPlaylist>(["playlist", id], fetchPlaylist, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {playlist && (
        <>
          <div className="flex lg:space-x-10 flex-wrap">
            <div className="basis-full xl:basis-1/5 text-center xl:sticky xl:top-0 xl:self-start">
              <TrackHeader data={playlist} />
            </div>
            <div className="flex-grow">
              <SectionWrapper title="Playlist tracks" breadcrumb="true">
                <TrackGrid
                  items={playlist.tracks.items
                    .map(({ track }) => track)
                    .slice(0, 50)}
                />
              </SectionWrapper>
            </div>
          </div>
        </>
      )}
    </>
  );
}
