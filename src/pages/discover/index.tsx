import { useQuery } from "@tanstack/react-query";

import { SectionWrapper } from "../../components";
import { AlbumGrid, CategoryGrid, PlaylistGrid } from "../../components/grid";
import {
  AlbumGridSkeleton,
  CategoryGridSkeleton,
  PlaylistGridSkeleton,
} from "../../components/skeleton";
import { ICategories } from "../../lib/interfaces/categories";
import { IFeaturedPlaylists } from "../../lib/interfaces/featured-playlists";
import { INewReleases } from "../../lib/interfaces/new-releases";
import { getCategories, getFeaturedPlaylists, getNewReleases } from "../../lib/spotify";

export default function Discover() {
  const fetchNewReleases = async () => {
    const newReleases = await getNewReleases(6);
    return newReleases.data;
  };

  const fetchFeaturedPlaylists = async () => {
    const featuredPlaylists = await getFeaturedPlaylists(6);
    return featuredPlaylists.data;
  };

  const fetchCategories = async () => {
    const categories = await getCategories(6);
    return categories.data;
  };

  const { data: releases } = useQuery<INewReleases>(["new-releases"], fetchNewReleases, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: featured } = useQuery<IFeaturedPlaylists>(
    ["featured-playlists"],
    fetchFeaturedPlaylists,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const { data: categories } = useQuery<ICategories>(["categories"], fetchCategories, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {releases && featured && categories ? (
        <>
          <SectionWrapper title="New album releases" seeAll="/discover/new-releases">
            <AlbumGrid items={releases.albums.items} />
          </SectionWrapper>
          <SectionWrapper title="Featured playlists" seeAll="/discover/featured-playlists">
            <PlaylistGrid items={featured.playlists.items} />
          </SectionWrapper>
          <SectionWrapper title="Categories" seeAll="/discover/categories">
            <CategoryGrid items={categories.categories.items} />
          </SectionWrapper>
        </>
      ) : (
        <>
          <AlbumGridSkeleton amount={6} />
          <CategoryGridSkeleton amount={6} />
          <PlaylistGridSkeleton amount={6} />
        </>
      )}
    </>
  );
}
