import { SectionWrapper } from "../components";
import { getNewReleases } from "../spotify";
import { AlbumGrid } from "../components/grid";
import { INewReleases } from "../common/interfaces/newReleases";
import { useQuery } from "react-query";

export default function NewReleases() {
  const fetchNewReleases = async () => {
    const newReleases = await getNewReleases();
    return newReleases.data;
  };

  const {
    data: releases,
    isLoading: releasesIsLoading,
    error: releasesError,
  } = useQuery<INewReleases>("new-releases", fetchNewReleases, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {releases && (
        <>
          <SectionWrapper title="New album releases" breadcrumb="true">
            <AlbumGrid items={releases.albums.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
