import React, { useState, useEffect, useMemo } from "react";
import { SectionWrapper, Header } from "../components";
import { TrackGrid } from "../components/grid";
import { getPlaylistById } from "../spotify";
import { useParams } from "react-router-dom";

import axios from "axios";
import { IPlaylist, Tracks } from "../common/interfaces/playlist";
import { useQuery } from "react-query";

export default function Playlist() {
  const { id } = useParams();
  // const [tracksData, setTracksData] = useState<Tracks>();
  // const [tracks, setTracks] = useState<Tracks["items"]>();

  const fetchPlaylist = async () => {
    const playlist = await getPlaylistById(id!);
    // setTracksData(playlist.data.tracks);
    return playlist.data;
  };

  const {
    data: playlist,
    isLoading: playlistIsLoading,
    error: playlistError,
  } = useQuery<IPlaylist>(["playlist", id], fetchPlaylist);

  // When tracksData updates, compile arrays of tracks and audioFeatures
  // useEffect(() => {
  //   if (!tracksData) {
  //     return;
  //   }

  //   // When tracksData updates, check if there are more tracks to fetch
  //   // then update the state variable
  //   const fetchMoreData = async () => {
  //     try {
  //       if (tracksData.next) {
  //         const { data } = await axios.get(tracksData.next);
  //         setTracksData(data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   setTracks((tracks) => [...(tracks ? tracks : []), ...tracksData.items]);

  //   fetchMoreData();
  // }, [tracksData]);

  // const tracksForTracklist: any = useMemo(() => {
  //   // TODO CHANGE ANY DATATYPE
  //   if (!tracks) {
  //     return;
  //   }
  //   return tracks.map(({ track }) => track);
  // }, [tracks]);

  return (
    <>
      {playlist && (
        <>
          <SectionWrapper title="Playlists" breadcrumb="true">
            <Header data={playlist} />
            <TrackGrid
              items={playlist.tracks.items.map(({ track }) => track)}
            />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
