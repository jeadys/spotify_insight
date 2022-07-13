import React from "react";
import { useQuery } from "react-query";
import {
  getCategories,
  getFeaturedPlaylists,
  getNewReleases,
} from "../spotify";
import { AlbumGrid, PlaylistGrid, CategoryGrid } from "../components/grid";
import { INewReleases } from "../common/interfaces/newReleases";
import { SectionWrapper } from "../components";
import { ICategories } from "../common/interfaces/categories";
import { IFeaturedPlaylists } from "../common/interfaces/featuredPlaylists";

export default function Discover() {
  const fetchNewReleases = async () => {
    const newReleases = await getNewReleases();
    return newReleases.data;
  };

  const fetchFeaturedPlaylists = async () => {
    const featuredPlaylists = await getFeaturedPlaylists();
    return featuredPlaylists.data;
  };

  const fetchCategories = async () => {
    const categories = await getCategories();
    return categories.data;
  };

  const {
    data: releases,
    isLoading: releasesIsLoading,
    error: releasesError,
  } = useQuery<INewReleases>("new-releases", fetchNewReleases);

  const {
    data: featured,
    isLoading: featuredIsLoading,
    error: featuredError,
  } = useQuery<IFeaturedPlaylists>(
    "featured-playlists",
    fetchFeaturedPlaylists
  );

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    error: categoriesError,
  } = useQuery<ICategories>("categories", fetchCategories);

  return (
    <>
      {releases && featured && categories && (
        <>
          <SectionWrapper
            title="New album releases"
            seeAll="/discover/new-releases"
          >
            <AlbumGrid items={releases.albums.items.slice(0, 6)} />
          </SectionWrapper>
          <SectionWrapper
            title="Featured playlists"
            seeAll="/discover/featured-playlists"
          >
            <PlaylistGrid items={featured.playlists.items.slice(0, 6)} />
          </SectionWrapper>
          <SectionWrapper title="Categories" seeAll="/discover/categories">
            <CategoryGrid items={categories.categories.items.slice(0, 6)} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
