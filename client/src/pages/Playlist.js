import React, { useState, useEffect, useMemo } from "react";
import { getPlaylistById } from "../spotify";
import { useParams } from "react-router-dom";
import SectionWrapper from "../components/SectionWrapper";
import axios from "axios";
import TrackGrid from "../components/grid/TrackGrid";

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
            {playlist.images.length && playlist.images[0] ? (
              <img
                className="w-96 h-96 flex-shrink-0 mx-auto rounded-md"
                src={playlist.images[0].url}
                alt={playlist.name}
              />
            ) : (
              <img
                className="w-96 h-96 flex-shrink-0 mx-auto rounded-md"
                src="/images/nocover.webp"
                alt={playlist.name}
              />
            )}
            <p className="text-white text-center my-5 font-black text-md">
              <span className="block text-2xl"> {playlist.name}</span>
              {playlist.followers.total ? (
                <span>
                  {playlist.followers.total.toLocaleString()}{" "}
                  {`follower${playlist.followers.total !== 1 ? "s " : " "}`}
                </span>
              ) : null}
              <span>
                {playlist.tracks.total.toLocaleString()}{" "}
                {`song${playlist.tracks.total !== 1 ? "s" : ""}`}
              </span>
            </p>
            <TrackGrid tracks={tracksForTracklist} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
