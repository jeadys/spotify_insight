import { getArtistById, getArtistTopTracks, getArtistAlbums } from "../spotify";
import React, { useState, useEffect } from "react";
import { AlbumGrid, TrackGrid } from "../components/grid";
import { SectionWrapper, Header } from "../components";
import { useParams } from "react-router-dom";

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
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [id]);

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
