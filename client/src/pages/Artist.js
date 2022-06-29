import React, { useState, useEffect, useMemo } from "react";
import { getArtistById, getArtistTopTracks, getArtistAlbums } from "../spotify";
import { useParams } from "react-router-dom";
import TrackGrid from "../components/grid/TrackGrid";
import PlaylistGrid from "../components/grid/PlaylistGrid";
import SectionWrapper from "../components/SectionWrapper";
import Header from "../components/Header";
import AlbumGrid from "../components/grid/AlbumGrid";

export default function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState();
  const [artistTopTracks, setArtistTopTracks] = useState();
  const [artistAlbums, setArtistAlbums] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistData = await getArtistById(id);
        setArtist(artistData.data);

        const artistTopTracks = await getArtistTopTracks(id);
        setArtistTopTracks(artistTopTracks.data.tracks);

        const artistAlbums = await getArtistAlbums(id);
        setArtistAlbums(artistAlbums.data.items);
        console.log(artistAlbums.data.items);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [id]);

  console.log(artistTopTracks);

  return (
    <>
      {artist && artistTopTracks && artistAlbums && (
        <>
          <SectionWrapper title="Popular releases" breadcrumb="true">
            <Header data={artist} artist={true} />
            <TrackGrid tracks={artistTopTracks} />
          </SectionWrapper>

          <SectionWrapper title="Popular albums" breadcrumb="true">
            <AlbumGrid albums={artistAlbums} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}