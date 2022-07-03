import React, { useState, useContext } from "react";
import { accessToken } from "../spotify";
import TrackPlayer from "./TrackPlayer";

type ChooseTrackProps = {
  chooseTrack: (track: string) => void;
};

const PlayTrackContext = React.createContext<string | undefined>(undefined);
const ChooseTrackContext = React.createContext<ChooseTrackProps["chooseTrack"]>(
  {} as ChooseTrackProps["chooseTrack"]
);

export const PlayTrack = () => {
  return useContext(PlayTrackContext);
};

export const ChooseTrack = () => {
  return useContext(ChooseTrackContext);
};

type TrackProviderProps = {
  children: React.ReactNode;
};

export const TrackProvider = ({ children }: TrackProviderProps) => {
  const [playingTrack, setPlayingTrack] = useState<string>("");

  const chooseTrack = (track: string) => {
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
