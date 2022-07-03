import { getArtistById, getArtistTopTracks, getArtistAlbums } from "../spotify";
import React, { useState, useEffect } from "react";
import { AlbumGrid, TrackGrid } from "../components/grid";
import { SectionWrapper, Header } from "../components";
import { useParams } from "react-router-dom";
import { IArtist } from "../common/interfaces/artist";
// import { IArtistsTopTracks } from "../common/interfaces/artistsTopTracks";
import { IArtistsAlbums } from "../common/interfaces/artistsAlbums";
import { IArtistsTopTracks } from "../common/interfaces/artistsTopTracks";

export default function Artist() {
  const { id } = useParams();
  const [artist, setArtist] = useState<IArtist>();
  const [artistTopTracks, setArtistTopTracks] = useState<IArtistsTopTracks>();
  const [artistAlbums, setArtistAlbums] = useState<IArtistsAlbums>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistData = await getArtistById(id!);
        setArtist(artistData.data);

        const artistTopTracks = await getArtistTopTracks(id!);
        setArtistTopTracks(artistTopTracks.data);

        const artistAlbums = await getArtistAlbums(id!);
        setArtistAlbums(artistAlbums.data);
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
            <Header data={artist} />
            <TrackGrid items={artistTopTracks.tracks} />
          </SectionWrapper>

          <SectionWrapper title="Popular albums" breadcrumb="true">
            <AlbumGrid items={artistAlbums.items} />
          </SectionWrapper>
        </>
      )}
    </>
  );
}
