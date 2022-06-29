import React, { useState, useEffect, useMemo } from "react";
import { SectionWrapper, Header } from "../components";
import { TrackGrid } from "../components/grid";
import { useParams } from "react-router-dom";
import { getAlbumById } from "../spotify";
import axios from "axios";

export default function Album() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [tracksData, setTracksData] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getAlbumById(id);
        setAlbum(data);
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
    return tracks.map((track) => track);
  }, [tracks]);

  return (
    <>
      {album && (
        <>
          <SectionWrapper title="Albums" breadcrumb="true">
            <Header data={album} />
            <TrackGrid tracks={tracksForTracklist} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
