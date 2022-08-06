import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { SectionWrapper } from "../../components";
import { TrackGrid } from "../../components/grid";
import { TrackGridSkeleton } from "../../components/skeleton";
import { IPlaylist } from "../../lib/interfaces/playlist";
import { IRecommendations } from "../../lib/interfaces/recommendations";
import { getPlaylistById, getRecommendationsForTracks } from "../../lib/spotify";

export default function Recommendations() {
  const { query } = useRouter();
  const { id } = query;

  const fetchPlaylist = async () => {
    const playlist = await getPlaylistById(id!);
    return playlist.data;
  };

  const { data: playlist } = useQuery<IPlaylist>(["playlist", id], fetchPlaylist, {
    refetchOnWindowFocus: false,
  });

  const fetchRecommendationsForTracks = async () => {
    const recommendations = await getRecommendationsForTracks(
      playlist!.tracks.items, // Can't be null or undefined because the 'enabled' parameter is set in the usequery.
      50
    );
    return recommendations.data;
  };

  const { data: recommendations } = useQuery<IRecommendations>(
    ["recommendations-based-on", id],
    fetchRecommendationsForTracks,
    { enabled: !!playlist, refetchOnWindowFocus: false }
  );

  return (
    <>
      {playlist && recommendations ? (
        <>
          <SectionWrapper title={`Recommendations based on ${playlist.name}`} breadcrumb="true">
            <TrackGrid items={recommendations.tracks.slice(0, 50)} />
          </SectionWrapper>
        </>
      ) : (
        <TrackGridSkeleton amount={50} />
      )}
    </>
  );
}
