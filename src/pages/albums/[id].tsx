import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { SectionWrapper } from "../../components";
import { TrackGrid } from "../../components/grid";
import { TrackHeader } from "../../components/header";
import { IAlbum } from "../../lib/interfaces/album";
import { getAlbumById } from "../../lib/spotify";

export default function Album() {
  const { query } = useRouter();
  const { id } = query;

  const fetchAlbum = async () => {
    const album = await getAlbumById(id!);
    return album.data;
  };

  const { data: album } = useQuery<IAlbum>(["album", id], fetchAlbum, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {album && (
        <>
          <div className="flex lg:space-x-10 flex-wrap">
            <div className="basis-full xl:basis-1/5 text-center xl:sticky xl:top-0 xl:self-start">
              <TrackHeader data={album} />
            </div>
            <div className="flex-grow">
              <SectionWrapper title="Album tracks" breadcrumb="true">
                <TrackGrid items={album.tracks.items.map((track) => track).slice(0, 50)} />
              </SectionWrapper>
            </div>
          </div>
        </>
      )}
    </>
  );
}
