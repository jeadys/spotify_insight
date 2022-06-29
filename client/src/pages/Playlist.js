import React, { useState, useEffect, useMemo } from "react";
import { SectionWrapper, Header } from "../components";
import { TrackGrid } from "../components/grid";
import { getPlaylistById } from "../spotify";
import { useParams } from "react-router-dom";

import axios from "axios";

export default function Playlist() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [tracksData, setTracksData] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getPlaylistById(id);
        setPlaylist(data);
        setTracksData(data.tracks);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [id]);

  // When tracksData updates, compile arrays of tracks and audioFeatures
  useEffect(() => {
    if (!tracksData) {
      return;
    }

    // When tracksData updates, check if there are more tracks to fetch
    // then update the state variable
    const fetchMoreData = async () => {
      try {
        if (tracksData.next) {
          const { data } = await axios.get(tracksData.next);
          setTracksData(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    setTracks((tracks) => [...(tracks ? tracks : []), ...tracksData.items]);

    fetchMoreData();
  }, [tracksData]);

  const tracksForTracklist = useMemo(() => {
    if (!tracks) {
      return;
    }
    return tracks.map(({ track }) => track);
  }, [tracks]);

  return (
    <>
      {playlist && (
        <>
          <SectionWrapper title="Playlists" breadcrumb="true">
            <Header data={playlist} />
            <TrackGrid tracks={tracksForTracklist} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
