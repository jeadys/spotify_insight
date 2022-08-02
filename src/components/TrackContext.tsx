import React, { useState, useContext } from "react";
import TrackPlayer from "./TrackPlayer";
import { useSession } from "next-auth/react";

type ChooseTrackProps = {
  chooseTrack: (tracks: string[], track: string) => void;
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
  const { data: session } = useSession();

  const [playingTrack, setPlayingTrack] = useState<string>(
    "spotify:track:4cOdK2wGLETKBW3PvgPWqT"
  );

  const [trackQueue, setTrackQueue] = useState<string[]>([
    "spotify:track:4cOdK2wGLETKBW3PvgPWqT",
  ]);

  const chooseTrack = (tracks: string[], track: string) => {
    setTrackQueue(tracks);
    setPlayingTrack(track);
  };

  return (
    <PlayTrackContext.Provider value={playingTrack}>
      <ChooseTrackContext.Provider value={chooseTrack}>
        <TrackPlayer
          token={session ? (session.accessToken as string) : undefined}
          trackQueue={trackQueue}
          trackOffset={playingTrack}
          setPlayingTrack={setPlayingTrack}
        />
        {children}
      </ChooseTrackContext.Provider>
    </PlayTrackContext.Provider>
  );
};

export default TrackProvider;
