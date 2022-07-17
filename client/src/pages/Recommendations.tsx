import React from "react";
import { useQuery } from "react-query";
import { SectionWrapper } from "../components";
import { TrackHeader } from "../components";
import { TrackGrid } from "../components/grid";
import { getRecommendationsForTracks, getPlaylistById } from "../spotify";
import { IPlaylist } from "../common/interfaces/playlist";
import { IRecommendations } from "../common/interfaces/recommendations";
import { useParams } from "react-router-dom";

export default function Recommendations() {
  const { id } = useParams();

  const fetchPlaylist = async () => {
    const playlist = await getPlaylistById(id!);
    return playlist.data;
  };

  const { data: playlist } = useQuery<IPlaylist>(
    ["playlist", id],
    fetchPlaylist,
    {
      refetchOnWindowFocus: false,
    }
  );

  const fetchRecommendationsForTracks = async () => {
    const recommendations = await getRecommendationsForTracks(
      playlist!.tracks.items // Can't be null or undefined because the 'enabled' parameter is set in the usequery.
    );
    return recommendations.data;
  };

  const { data: recommendations } = useQuery<IRecommendations>(
    ["recommendations-based-on", id],
    fetchRecommendationsForTracks,
    {
      enabled: !!playlist,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      {playlist && recommendations && (
        <>
          <SectionWrapper
            title={`Recommendations based on ${playlist.name}`}
            breadcrumb="true"
          >
            <TrackGrid items={recommendations.tracks.slice(0, 50)} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
