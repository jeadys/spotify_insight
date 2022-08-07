import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { SectionWrapper } from "../../../components";
import { AlbumGrid, ArtistGrid, TrackGrid } from "../../../components/grid";
import { ArtistHeader } from "../../../components/header";
import {
  AlbumGridSkeleton,
  ArtistGridSkeleton,
  ArtistHeaderSkeleton,
  TrackGridSkeleton,
} from "../../../components/skeleton";
import { IArtist } from "../../../lib/interfaces/artist";
import { IArtistsAlbums } from "../../../lib/interfaces/artist-album";
import { IArtistsRelatedArtists } from "../../../lib/interfaces/artist-related-artists";
import { IArtistsTopTracks } from "../../../lib/interfaces/artist-top-tracks";
import {
  getArtistAlbums,
  getArtistById,
  getArtistRelatedArtists,
  getArtistTopTracks,
} from "../../../lib/spotify";

export default function Artist() {
  const { query } = useRouter();
  const { id } = query;

  const fetchArtist = async () => {
    const artist = await getArtistById(id!);
    return artist.data;
  };

  const fetchArtistTopTracks = async () => {
    const artistTopTracks = await getArtistTopTracks(id!);
    return artistTopTracks.data;
  };

  const fetchArtistAlbums = async () => {
    const artistAlbums = await getArtistAlbums(id!, 6);
    return artistAlbums.data;
  };

  const fetchArtistRelatedArtists = async () => {
    const artistRelatedArtists = await getArtistRelatedArtists(id!);
    return artistRelatedArtists.data;
  };

  const { data: artist } = useQuery<IArtist>(["artist", id], fetchArtist, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { data: artistTopTracks } = useQuery<IArtistsTopTracks>(
    ["artist-tracks", id],
    fetchArtistTopTracks,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const { data: artistAlbums } = useQuery<IArtistsAlbums>(
    ["artist-albums", id],
    fetchArtistAlbums,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const { data: artistRelatedArtists } = useQuery<IArtistsRelatedArtists>(
    ["artist-related-artists", id],
    fetchArtistRelatedArtists,
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {artist && artistTopTracks && artistAlbums && artistRelatedArtists ? (
        <>
          <ArtistHeader data={artist} />
          <SectionWrapper title="Popular releases" breadcrumb="true">
            <TrackGrid items={artistTopTracks.tracks} />
          </SectionWrapper>

          <SectionWrapper title="Popular albums" seeAll={`/artists/${id}/related-albums`}>
            <AlbumGrid items={artistAlbums.items} />
          </SectionWrapper>

          <SectionWrapper title="Fans also like" seeAll={`/artists/${id}/related-artists`}>
            <ArtistGrid items={artistRelatedArtists.artists.slice(0, 6)} />
          </SectionWrapper>
        </>
      ) : (
        <>
          <ArtistHeaderSkeleton />
          <TrackGridSkeleton amount={12} />
          <AlbumGridSkeleton amount={6} />
          <ArtistGridSkeleton amount={6} />
        </>
      )}
    </>
  );
}
