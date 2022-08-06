import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../components";
import { AlbumGrid } from "../../components/grid";
import { AlbumGridSkeleton } from "../../components/skeleton";
import { INewReleases } from "../../lib/interfaces/new-releases";
import { getNewReleases } from "../../lib/spotify";

export default function NewReleases() {
  const fetchNewReleases = async () => {
    const newReleases = await getNewReleases(50);
    return newReleases.data;
  };

  const { data: releases } = useQuery<INewReleases>(["all-new-releases"], fetchNewReleases, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {releases ? (
        <>
          <SectionWrapper title="New album releases" breadcrumb="true">
            <AlbumGrid items={releases.albums.items} />
          </SectionWrapper>
        </>
      ) : (
        <AlbumGridSkeleton amount={50} />
      )}
    </>
  );
}
