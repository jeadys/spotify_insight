import React, { useState, useContext } from "react";
import { accessToken } from "../spotify";
import TrackPlayer from "./TrackPlayer";

const PlayTrackContext = React.createContext();
const ChooseTrackContext = React.createContext();

export const PlayTrack = () => {
  return useContext(PlayTrackContext);
};

export const ChooseTrack = () => {
  return useContext(ChooseTrackContext);
};

export const TrackProvider = ({ children }) => {
  const [playingTrack, setPlayingTrack] = useState();

  const chooseTrack = (track) => {
    setPlayingTrack(track);
  };

  return (
    <PlayTrackContext.Provider value={playingTrack}>
      <ChooseTrackContext.Provider value={chooseTrack}>
        <TrackPlayer token={accessToken} trackUri={playingTrack} />
        {children}
      </ChooseTrackContext.Provider>
    </PlayTrackContext.Provider>
  );
};

export default TrackProvider;
