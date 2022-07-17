import React, { useState, useEffect, useMemo } from "react";
import { SectionWrapper, TrackHeader } from "../components";
import { TrackGrid } from "../components/grid";
import { useParams } from "react-router-dom";
import { getAlbumById } from "../spotify";
import axios from "axios";
import { IAlbum, Tracks } from "../common/interfaces/album";
import { useQuery } from "react-query";

export default function Album() {
  const { id } = useParams();
  // const [tracksData, setTracksData] = useState<Tracks>();
  // const [tracks, setTracks] = useState<Tracks["items"]>();

  const fetchAlbum = async () => {
    const album = await getAlbumById(id!);
    // setTracksData(album.data.tracks);
    return album.data;
  };

  const {
    data: album,
    isLoading: albumIsLoading,
    error: albumError,
  } = useQuery<IAlbum>(["album", id], fetchAlbum, {
    refetchOnWindowFocus: false,
  });

  // // When tracksData updates, compile arrays of tracks and audioFeatures
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
  //   return tracks.map((track) => track);
  // }, [tracks]);

  return (
    <>
      {album && (
        <>
          <div className="flex lg:space-x-10 flex-wrap">
            <div className="basis-full xl:basis-1/5 text-center xl:sticky xl:top-0 xl:self-start">
              <TrackHeader data={album} />
            </div>
            <div className="flex-grow">
              <SectionWrapper title="Album tracks" breadcrumb="true">
                <TrackGrid
                  items={album.tracks.items.map((track) => track).slice(0, 50)}
                />
              </SectionWrapper>
            </div>
          </div>
        </>
      )}
    </>
  );
}
